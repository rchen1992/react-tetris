import React from 'react';
import StateContext from './StateContext';
import defaultState, { STARTING_BLOCK_COORDINATES } from './defaultState';
import rotateBlock from 'blocks/rotation';
import { MOVEMENT_DIRECTIONS, getRandomNewBlock } from 'blocks';
import getBlockCellCoordinateSet, { getNewCellCoordinateSet } from 'blocks/cellCoordinateSet';
import {
    isValidBlockMove,
    hasNoBlockCollisions,
    cloneGrid,
    clearFilledRows,
    isWithinGridBounds,
} from 'grid';
import { CLEAR_ROW_ANIMATION_DURATION } from 'style/animations';
import GAME_STATES from 'constants/gameStates';

function StateProvider(props) {
    const [grid, setGrid] = React.useState(defaultState.grid);
    const [currentBlock, setCurrentBlock] = React.useState(defaultState.currentBlock);
    const [animatedRows, setAnimatedRows] = React.useState([]);
    const [gameSpeed, setGameSpeed] = React.useState(defaultState.gameSpeed);
    const [gameState, setGameState] = React.useState(defaultState.gameState);
    const currentBlockCellCoordinateSet = React.useRef(null);

    function rotateCurrentBlock() {
        if (!canPerformAction()) return;

        const { positionCoordinates, properties } = currentBlock;
        const rotatedBlockShape = rotateBlock(properties.shape);

        if (isValidBlockMove(grid, positionCoordinates, rotatedBlockShape)) {
            setCurrentBlock(prevBlock => ({
                ...prevBlock,
                properties: {
                    ...prevBlock.properties,
                    shape: rotatedBlockShape,
                },
            }));
        }
    }

    function moveCurrentBlock(direction) {
        if (!canPerformAction()) return;

        const [row, col] = currentBlock.positionCoordinates;

        let newCoords;
        switch (direction) {
            case MOVEMENT_DIRECTIONS.LEFT:
                newCoords = [row, col - 1];
                break;
            case MOVEMENT_DIRECTIONS.RIGHT:
                newCoords = [row, col + 1];
                break;
            case MOVEMENT_DIRECTIONS.DOWN:
                newCoords = [row + 1, col];
                break;
            default:
                // No movement
                newCoords = [row, col];
        }

        if (isValidBlockMove(grid, newCoords, currentBlock.properties.shape)) {
            setCurrentBlock(prevBlock => ({
                ...prevBlock,
                positionCoordinates: newCoords,
            }));
        } else {
            if (direction === MOVEMENT_DIRECTIONS.DOWN) {
                commitCurrentBlock();
            }
        }
    }

    async function commitCurrentBlock() {
        if (!canPerformAction()) return;

        /**
         * This is the check for the game over condition.
         * The game is considered over when a block needs to be committed
         * but it is out of grid bounds.
         *
         * Note: the only way a current block could be out of grid bounds
         * is if it was moved out of bounds during its initial generation.
         * @see generateNewCurrentBlock
         */
        if (!isWithinGridBounds(grid, currentBlockCellCoordinateSet.current)) {
            return setGameState(GAME_STATES.GAME_OVER);
        }

        /**
         * Get the list of coordinates for the current block
         * and then update the grid with those values.
         */
        const coords = currentBlockCellCoordinateSet.current.keysArray();
        const newGrid = cloneGrid(grid);
        coords.forEach(coord => {
            const [row, col] = coord;
            newGrid[row][col] = currentBlock.properties.type;
        });

        setGrid(newGrid);

        /**
         * Clear current block first so that we can't try to move it
         * while any clear row animation is running.
         */
        setCurrentBlock(null);

        /**
         * Clear any filled rows from the grid.
         */
        await clearRows(newGrid);

        generateNewCurrentBlock(newGrid);
    }

    /**
     * Generate new block at the top of the grid.
     */
    function generateNewCurrentBlock(newGrid) {
        const blockType = getRandomNewBlock();
        const [row, col] = STARTING_BLOCK_COORDINATES;
        let newBlock;
        let coordinateSet;
        let currentRow = row;

        /**
         * We render new blocks at the top of the grid.
         * This means that the new block could possibly render directly
         * overlapping an existing block.
         *
         * To fix this, we check for a block collision before rendering,
         * and then continue to move the block upwards until it is possible to render.
         *
         * This allows the user to potentially see part of a block at the top of the grid
         * right before it's game over.
         */
        do {
            newBlock = {
                properties: blockType,
                positionCoordinates: [currentRow, col],
            };

            coordinateSet = getBlockCellCoordinateSet(
                newBlock.properties.shape,
                newBlock.positionCoordinates
            );

            // Move block up by one row.
            currentRow -= 1;
        } while (!hasNoBlockCollisions(newGrid, coordinateSet));

        setCurrentBlock(newBlock);
    }

    /**
     * Drops current block straight down to next available position.
     */
    function dropBlock() {
        if (!canPerformAction()) return;

        /**
         * Continually move block downwards and check if it is a valid move.
         * As soon as it is invalid, we know the final location for the block
         * should be just before the last move.
         */
        const [row, col] = currentBlock.positionCoordinates;
        let rowMove = 1;
        while (isValidBlockMove(grid, [row + rowMove, col], currentBlock.properties.shape)) {
            rowMove += 1;
        }

        /**
         * Move block to new location.
         * Note: we do `rowMove - 1` because we went past the last
         * valid position for a block.
         */
        const newCoords = [row + rowMove - 1, col];
        setCurrentBlock(prevBlock => ({
            ...prevBlock,
            positionCoordinates: newCoords,
        }));

        /**
         * A dropped block should also be committed at the same time.
         */
        commitCurrentBlock();
    }

    /**
     * Clears any filled rows on the grid with an animation.
     * Promise resolves when animation finishes OR when
     * there are no rows to clear.
     */
    function clearRows(grid) {
        return new Promise((resolve, reject) => {
            /**
             * Array of indexes for rows that are filled and should be cleared.
             */
            const clearedRowNumbers = grid.reduce((result, row, rowIndex) => {
                if (row.every(cell => cell !== null)) {
                    result.push(rowIndex);
                }
                return result;
            }, []);

            /**
             * If we have filled rows to clear,
             * we first need to animate the clearing of those rows.
             */
            if (clearedRowNumbers.length > 0) {
                setAnimatedRows(clearedRowNumbers);

                /**
                 * After animation finishes, clear lines from grid
                 */
                setTimeout(() => {
                    setAnimatedRows([]);
                    setGrid(clearFilledRows(grid));

                    resolve();
                }, CLEAR_ROW_ANIMATION_DURATION);
            } else {
                resolve();
            }
        });
    }

    /**
     * Can perform an in-game action.
     */
    function canPerformAction() {
        return gameState === GAME_STATES.PLAYING && currentBlock;
    }

    /**
     * Toggles between playing and paused states.
     * Note: a game can only be paused if it is currently playing,
     * and vice versa.
     * Otherwise it does nothing.
     */
    function togglePauseGame() {
        setGameState(prevState => {
            if (prevState === GAME_STATES.PLAYING) {
                return GAME_STATES.PAUSED;
            } else if (prevState === GAME_STATES.PAUSED) {
                return GAME_STATES.PLAYING;
            } else {
                return prevState;
            }
        });
    }

    /**
     * Compute cell coordinate set for current block.
     * If there is no current block, we will just use an empty coordinate set.
     */
    currentBlockCellCoordinateSet.current = currentBlock
        ? getBlockCellCoordinateSet(currentBlock.properties.shape, currentBlock.positionCoordinates)
        : getNewCellCoordinateSet();

    const state = React.useMemo(
        () => ({
            grid,
            currentBlock,
            animatedRows,
            currentBlockCellCoordinateSet: currentBlockCellCoordinateSet.current,
            rotateCurrentBlock,
            moveCurrentBlock,
            dropBlock,
            gameSpeed,
            gameState,
            setGameState,
            togglePauseGame,
        }),
        [grid, currentBlock, animatedRows, currentBlockCellCoordinateSet, gameSpeed, gameState]
    );

    return <StateContext.Provider value={state}>{props.children}</StateContext.Provider>;
}

export default StateProvider;
