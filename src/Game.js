import React from 'react';
import { useStore } from 'store';
import styled, { css } from 'styled-components';
import { math } from 'polished';
import useKeyboardListeners from 'hooks/useKeyboardListeners';
import { MOVEMENT_DIRECTIONS } from 'blocks';
import { CLEAR_ROW_ANIMATION_DURATION, clearRowAnimation } from 'style/animations';

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

    ${props =>
        props.animatingClear &&
        css`
            animation: ${clearRowAnimation} ${CLEAR_ROW_ANIMATION_DURATION}ms;
        `};
`;

function Game() {
    const store = useStore();
    const {
        grid,
        currentBlock,
        animatedRows,
        currentBlockCellCoordinateSet,
        rotateCurrentBlock,
        moveCurrentBlock,
        dropBlock,
        gameSpeed,
    } = store;

    const gameTick = React.useRef(null);

    /**
     * We put the entire store into a ref "container"
     * and keep it updated every render
     * so that we can access the store's latest values
     * in the `setInterval` loop.
     *
     * Otherwise, if we use store methods/variables directly in the
     * `setInterval` callback, the callback forms a closure over those
     * variables, which will never change, even when the component is
     * re-rendered.
     */
    const storeRef = React.useRef(store);
    storeRef.current = store;

    React.useEffect(() => {
        gameTick.current = setInterval(() => {
            storeRef.current.moveCurrentBlock(MOVEMENT_DIRECTIONS.DOWN);
        }, gameSpeed);

        return () => {
            clearInterval(gameTick.current);
        };
    }, []);

    /**
     * Keyboard controls.
     */
    useKeyboardListeners({
        ArrowUp: {
            callback: () => rotateCurrentBlock(),
        },
        ArrowLeft: {
            isActiveEvent: true,
            callback: () => moveCurrentBlock(MOVEMENT_DIRECTIONS.LEFT),
        },
        ArrowRight: {
            isActiveEvent: true,
            callback: () => moveCurrentBlock(MOVEMENT_DIRECTIONS.RIGHT),
        },
        ArrowDown: {
            isActiveEvent: true,
            callback: () => moveCurrentBlock(MOVEMENT_DIRECTIONS.DOWN),
        },
        ' ': {
            callback: () => dropBlock(), // spacebar
        },
        Spacebar: {
            callback: () => dropBlock(), // spacebar for older browsers
        },
    });

    let cells = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let blockType = grid[i][j];
            if (!blockType && currentBlockCellCoordinateSet.has([i, j])) {
                blockType = currentBlock.properties.type;
            }

            cells.push(
                <Cell
                    key={`${i}${j}`}
                    row={i}
                    col={j}
                    blockType={blockType}
                    animatingClear={animatedRows.includes(i)}
                />
            );
        }
    }

    return (
        <Grid height={grid.length} width={grid[0].length}>
            {cells}
        </Grid>
    );
}

export default Game;
