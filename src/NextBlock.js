import React from 'react';
import { useStore } from 'store';
import styled from 'styled-components';
import { math } from 'polished';

const Grid = styled.div`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.width}, ${props.theme.cellSize})`};
    grid-template-rows: ${props => `repeat(${props.height}, ${props.theme.cellSize})`};
    width: ${props => math(`${props.theme.cellSize} * ${props.width}`)};
    position: relative;
`;

const Cell = styled.span`
    border: ${props => (props.blockType === null ? 'none' : '1px solid black')};
    background-color: ${props => {
        return props.theme.blockColors[props.blockType] || 'transparent';
    }};
`;

function NextBlock() {
    const { nextBlockQueue } = useStore();
    const { shape, type } = nextBlockQueue[0];

    let cells = [];
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            const blockType = shape[i][j] === 1 ? type : null;
            cells.push(<Cell key={`${i}${j}`} row={i} col={j} blockType={blockType} />);
        }
    }

    return (
        <Grid height={shape.length} width={shape[0].length}>
            {cells}
        </Grid>
    );
}

export default NextBlock;
