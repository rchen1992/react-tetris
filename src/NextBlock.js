import React from 'react';
import { useStore } from 'store';
import styled from 'styled-components';
import { math } from 'polished';
import { Coating, Grid, GridCell, InnerGridCell } from './shared.styled';

const ContainerCoating = styled(Coating)`
    align-self: flex-start;
`;

const Container = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: ${props => math(`${props.theme.cellSize} * 4`)};
    height: ${props => math(`${props.theme.cellSize} * 2`)};
    background-color: ${({ theme }) => theme.gridBackgroundColor};
    padding: 16px 10px;
    box-sizing: content-box;
    border-radius: 6px;
`;

const OuterCell = styled(GridCell)`
    border: ${props =>
        props.blockType === null ? 'none' : `1px solid ${props.theme.gridLineColor}`};
`;

function NextBlock() {
    const { nextBlockQueue } = useStore();
    const { shape, type } = nextBlockQueue[0];

    let cells = [];
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            const blockType = shape[i][j] === 1 ? type : null;
            cells.push(
                <OuterCell key={`${i}${j}`} blockType={blockType}>
                    <InnerGridCell blockType={blockType} />
                </OuterCell>
            );
        }
    }

    return (
        <ContainerCoating>
            <Container>
                <Grid height={shape.length} width={shape[0].length}>
                    {cells}
                </Grid>
            </Container>
        </ContainerCoating>
    );
}

export default NextBlock;
