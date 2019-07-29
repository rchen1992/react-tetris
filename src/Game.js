import React from 'react';
import { useStore } from 'store';
import styled from 'styled-components';
import { math } from 'polished';
import useKeyboardListeners from 'hooks/useKeyboardListeners';
import { MOVEMENT_DIRECTIONS } from 'blocks';
import { BLOCK_TYPES } from 'blocks';

const Grid = styled.div`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.width}, ${props.theme.cellSize})`};
    grid-template-rows: ${props => `repeat(${props.height}, ${props.theme.cellSize})`};
    width: ${props => math(`${props.theme.cellSize} * ${props.width}`)};
    border: 1px solid black;
    margin: auto;
    margin-top: 50px;
`;

const Cell = styled.span`
    border: 1px solid black;
    background-color: ${props => {
        return props.theme.blockColors[props.blockType] || 'none';
    }};
`;

function Game() {
    const {
        grid,
        currentBlock,
        currentBlockCellCoordinateMap,
        rotateCurrentBlock,
        moveCurrentBlock,
    } = useStore();

    useKeyboardListeners({
        ArrowUp: () => rotateCurrentBlock(),
        ArrowLeft: () => moveCurrentBlock(MOVEMENT_DIRECTIONS.LEFT),
        ArrowRight: () => moveCurrentBlock(MOVEMENT_DIRECTIONS.RIGHT),
        ArrowDown: () => moveCurrentBlock(MOVEMENT_DIRECTIONS.DOWN),
    });

    console.log(currentBlockCellCoordinateMap.keysArray());
    console.log(currentBlock);

    let cells = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let blockType = grid[i][j];
            if (!blockType && currentBlockCellCoordinateMap.has([i, j])) {
                blockType = currentBlock.properties.type;
            }

            cells.push(<Cell key={`${i}${j}`} row={i} col={j} blockType={blockType} />);
        }
    }

    return (
        <Grid height={grid.length} width={grid[0].length}>
            {cells}
        </Grid>
    );
}

export default Game;
