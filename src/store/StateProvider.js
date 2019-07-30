import React from 'react';
import StateContext from './StateContext';
import defaultState, { STARTING_BLOCK_COORDINATES } from './defaultState';
import rotateBlock from 'blocks/rotation';
import { MOVEMENT_DIRECTIONS, getRandomNewBlock } from 'blocks';
import getBlockCellCoordinateSet from 'blocks/cellCoordinateSet';
import { isValidBlockMove, cloneGrid, clearFilledRows } from 'grid';
import { CLEAR_ROW_ANIMATION_DURATION } from 'style/animations';

function StateProvider(props) {
    const [grid, setGrid] = React.useState(defaultState.grid);
    const [currentBlock, setCurrentBlock] = React.useState(defaultState.currentBlock);
    const [animatedRows, setAnimatedRows] = React.useState([]);
    const currentBlockCellCoordinateSet = React.useRef(null);

    function rotateCurrentBlock() {
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

    function commitCurrentBlock() {
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
         * Clear any filled rows from the grid.
         */
        clearRows(newGrid);
    }

    /**
     * Drops current block straight down to next available position.
     */
    function dropBlock() {
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
     */
    function clearRows(grid) {
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
             * After animation finishes,
             * clear lines from grid, and generate the new block.
             *
             * We don't want the user to be able to seee
             * or manipulate the current block until after the
             * animation is done.
             */
            setTimeout(() => {
                setAnimatedRows([]);

                setGrid(clearFilledRows(grid));

                setCurrentBlock({
                    properties: getRandomNewBlock(),
                    positionCoordinates: STARTING_BLOCK_COORDINATES,
                });
            }, CLEAR_ROW_ANIMATION_DURATION);
        } else {
            /**
             * If we don't have lines to clear,
             * simply generate the new current block.
             */
            setCurrentBlock({
                properties: getRandomNewBlock(),
                positionCoordinates: STARTING_BLOCK_COORDINATES,
            });
        }
    }

    /**
     * Compute cell coordinate set for current block.
     */
    currentBlockCellCoordinateSet.current = getBlockCellCoordinateSet(
        currentBlock.properties.shape,
        currentBlock.positionCoordinates
    );

    const state = React.useMemo(
        () => ({
            grid,
            currentBlock,
            animatedRows,
            currentBlockCellCoordinateSet: currentBlockCellCoordinateSet.current,
            rotateCurrentBlock,
            moveCurrentBlock,
            dropBlock,
        }),
        [grid, currentBlock, animatedRows, currentBlockCellCoordinateSet]
    );

    return <StateContext.Provider value={state}>{props.children}</StateContext.Provider>;
}

export default StateProvider;
