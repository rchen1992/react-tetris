import React from 'react';
import StateContext from './StateContext';
import defaultState from './defaultState';
import rotateBlock from 'blocks/rotation';
import getCurrentBlockCellCoordinateMap from 'blocks/cellCoordinateMap';

function StateProvider(props) {
    const [grid, setGrid] = React.useState(defaultState.grid);
    const [currentBlock, setCurrentBlock] = React.useState(defaultState.currentBlock);

    function rotateCurrentBlock() {
        const { properties, positionCoordinates } = currentBlock;

        setCurrentBlock(prevBlock => {
            const rotatedBlock = rotateBlock(properties);
            return {
                ...prevBlock,
                properties: rotatedBlock,
                cellCoordinateMap: getCurrentBlockCellCoordinateMap(
                    rotatedBlock,
                    positionCoordinates
                ),
            };
        });
    }

    const state = React.useMemo(() => ({ grid, currentBlock, rotateCurrentBlock }), [
        grid,
        currentBlock,
    ]);

    return <StateContext.Provider value={state}>{props.children}</StateContext.Provider>;
}

export default StateProvider;
