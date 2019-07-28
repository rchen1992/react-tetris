import React from 'react';
import StateContext from './StateContext';
import defaultState from './defaultState';
import rotateBlock from 'blocks/rotation';
import getCurrentBlockCellCoordinateMap from 'blocks/cellCoordinateMap';

function StateProvider(props) {
    const [grid, setGrid] = React.useState(defaultState.grid);
    const [currentBlock, setCurrentBlock] = React.useState(defaultState.currentBlock);

    function rotateCurrentBlock() {
        setCurrentBlock(prevBlock => ({
            ...prevBlock,
            properties: rotateBlock(prevBlock.properties),
        }));
    }

    function moveCurrentBlockLeft() {
        setCurrentBlock(prevBlock => {
            const [row, col] = prevBlock.positionCoordinates;
            return {
                ...prevBlock,
                positionCoordinates: [row, col - 1],
            };
        });
    }

    function moveCurrentBlockRight() {
        setCurrentBlock(prevBlock => {
            const [row, col] = prevBlock.positionCoordinates;
            return {
                ...prevBlock,
                positionCoordinates: [row, col + 1],
            };
        });
    }

    function moveCurrentBlockDown() {
        setCurrentBlock(prevBlock => {
            const [row, col] = prevBlock.positionCoordinates;
            return {
                ...prevBlock,
                positionCoordinates: [row + 1, col],
            };
        });
    }

    /**
     * Compute cell coordinate map for current block.
     */
    const currentBlockCellCoordinateMap = getCurrentBlockCellCoordinateMap(
        currentBlock.properties,
        currentBlock.positionCoordinates
    );

    const state = React.useMemo(
        () => ({
            grid,
            currentBlock,
            currentBlockCellCoordinateMap,
            rotateCurrentBlock,
            moveCurrentBlockLeft,
            moveCurrentBlockRight,
            moveCurrentBlockDown,
        }),
        [grid, currentBlock, currentBlockCellCoordinateMap]
    );

    return <StateContext.Provider value={state}>{props.children}</StateContext.Provider>;
}

export default StateProvider;
