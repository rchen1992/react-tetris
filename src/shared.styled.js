import styled from 'styled-components';
import { math } from 'polished';

export const Coating = styled.div`
    padding: 6px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.gridCoatingColor};
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.width}, ${props.theme.cellSize})`};
    grid-template-rows: ${props => `repeat(${props.height}, ${props.theme.cellSize})`};
    width: ${props => math(`${props.theme.cellSize} * ${props.width}`)};
    position: relative;
`;

export const GridCell = styled.span`
    border: 1px solid ${({ theme }) => theme.gridLineColor};
    background-color: ${props => {
        return props.theme.gridBackgroundColor;
    }};
`;

export const InnerGridCell = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${props => {
        return props.theme.blockColors[props.blockType] || 'transparent';
    }};
    border: ${props =>
        props.blockType && props.theme.borderWidth
            ? `${props.theme.borderWidth}px ${props.theme.borderType} ${
                  props.theme.blockColors[props.blockType]
              }`
            : 'none'};
`;
