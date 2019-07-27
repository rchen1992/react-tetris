import React from 'react';
import { useStore } from 'store';
import styled from 'styled-components';
import { math } from 'polished';

const Grid = styled.div`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.width}, ${props.theme.cellSize})`};
    grid-template-rows: ${props => `repeat(${props.height}, ${props.theme.cellSize})`};
    width: ${props => math(`${props.theme.cellSize} * ${props.width}`)};
    background-color: blue;
`;

const Cell = styled.span`
    border: 1px solid black;
`;

function Game() {
    const { grid } = useStore();

    let cells = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            cells.push(<Cell key={`${i}${j}`} col={i} row={j} />);
        }
    }

    return (
        <Grid height={grid[0].length} width={grid.length}>
            {cells}
        </Grid>
    );
}

export default Game;
