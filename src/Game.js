import React from 'react';
import { useStore } from 'store';
import styled, { css } from 'styled-components';
import useKeyboardListeners from 'hooks/useKeyboardListeners';
import { MOVEMENT_DIRECTIONS } from 'blocks/movement';
import {
    CLEAR_ROW_ANIMATION_DURATION,
    COLLAPSE_ROW_ANIMATION_DURATION,
    ROW_ANIMATION_DURATION_OVERLAP,
    fadeOut,
    collapseRowAnimation,
    gridContainerAnimation,
} from 'style/animations';
import GAME_STATES from 'constants/gameStates';
import { Grid, Coating, GridCell, InnerGridCell } from './shared.styled';
import SideColumn from './SideColumn';
import { GRID_ANIMATION_DURATION, GRID_ANIMATION_DELAY } from 'style/animations';

const GridContainer = styled.div`
    display: inline-flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.gridContainerBackgroundColor};
    padding: 40px;
    border-radius: 10px;
    margin: auto;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    opacity: 0;

    animation: ${gridContainerAnimation} ${GRID_ANIMATION_DURATION}ms;
    animation-delay: ${GRID_ANIMATION_DELAY}ms;
    animation-fill-mode: forwards;
`;

const InnerCell = styled(InnerGridCell)`
    opacity: ${props => (props.isGhostBlock ? 0.5 : 1)};

    ${props =>
        props.animatingClear &&
        css`
            animation: ${fadeOut} ${CLEAR_ROW_ANIMATION_DURATION}ms;
            animation-fill-mode: forwards;
        `};

    ${props =>
        !!props.animatingCollapseRows &&
        css`
            animation: ${collapseRowAnimation(props)} ${COLLAPSE_ROW_ANIMATION_DURATION}ms;
            animation-delay: ${CLEAR_ROW_ANIMATION_DURATION - ROW_ANIMATION_DURATION_OVERLAP}ms;
            animation-fill-mode: forwards;
        `};
`;

const GridOverlay = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${props => (props.type === 'dark' ? 'hsla(0, 0%, 0%, 0.45)' : 'transparent')};
    z-index: ${({ theme }) => theme.gridOverlayZIndex};
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NewGameButton = styled.button`
    background-color: ${({ theme }) => theme.gameStateMenuColor};
    border: none;
    padding: 14px 20px;
    color: white;
    border-radius: 6px;
    transition: background-color 200ms, transform 200ms;

    :hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.gameStateMenuColorHover};
        transform: translateY(-2px);
    }
`;

const GameStateMenu = styled.div`
    background-color: ${({ theme }) => theme.gameStateMenuColor};
    color: white;
    padding: 16px;
    border-radius: 6px;
`;

function Game() {
    const store = useStore();
    const {
        grid,
        currentBlock,
        animatedRows,
        currentBlockCellCoordinateSet,
        ghostBlockCellCoordinateSet,
        rotateCurrentBlock,
        moveCurrentBlock,
        dropBlock,
        gameSpeed,
        gameState,
        setGameState,
        togglePauseGame,
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
        if (gameState === GAME_STATES.PLAYING) {
            gameTick.current = setInterval(() => {
                storeRef.current.moveCurrentBlock(MOVEMENT_DIRECTIONS.DOWN);
            }, gameSpeed);
        }
        return () => {
            clearInterval(gameTick.current);
        };
    }, [gameSpeed, gameState]);

    /**
     * Keyboard controls.
     */
    useKeyboardListeners({
        ArrowUp: () => rotateCurrentBlock(),
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
        ' ': () => dropBlock(), // spacebar
        Spacebar: () => dropBlock(), // spacebar for older browsers
        Escape: () => togglePauseGame(),
        Esc: () => togglePauseGame(), // IE/Edge
    });

    function renderGrid() {
        let cells = [];
        for (let i = 0; i < grid.length; i++) {
            /**
             * Should the current row run a line clear animation?
             */
            const animatingClear = animatedRows.includes(i);

            /**
             * How many lines should this row collapse
             * if we are running a line clear animation?
             *
             * Determined by checking how many rows were
             * cleared below this current row.
             */
            const animatingCollapseRows =
                animatedRows.length === 0 || animatedRows.includes(i)
                    ? null
                    : animatedRows.filter(row => row > i).length;

            for (let j = 0; j < grid[i].length; j++) {
                let blockType = grid[i][j];
                const isGhostBlock =
                    gameState !== GAME_STATES.NEW_GAME && ghostBlockCellCoordinateSet.has([i, j]);
                const isCurrentBlock =
                    gameState !== GAME_STATES.NEW_GAME && currentBlockCellCoordinateSet.has([i, j]);

                if (!blockType && (isCurrentBlock || isGhostBlock)) {
                    blockType = currentBlock.properties.type;
                }

                cells.push(
                    <GridCell key={`${i}${j}`}>
                        <InnerCell
                            blockType={blockType}
                            isGhostBlock={isGhostBlock && !isCurrentBlock}
                            animatingClear={animatingClear}
                            animatingCollapseRows={animatingCollapseRows}
                        />
                    </GridCell>
                );
            }
        }
        return cells;
    }

    return (
        <GridContainer>
            <Coating>
                <Grid height={grid.length} width={grid[0].length}>
                    {gameState === GAME_STATES.NEW_GAME && (
                        <GridOverlay>
                            <NewGameButton onClick={() => setGameState(GAME_STATES.PLAYING)}>
                                New Game
                            </NewGameButton>
                        </GridOverlay>
                    )}

                    {gameState === GAME_STATES.PAUSED && (
                        <GridOverlay type="dark">
                            <GameStateMenu>Paused</GameStateMenu>
                        </GridOverlay>
                    )}

                    {gameState === GAME_STATES.GAME_OVER && (
                        <GridOverlay type="dark">
                            <GameStateMenu>Game Over</GameStateMenu>
                        </GridOverlay>
                    )}

                    {renderGrid()}
                </Grid>
            </Coating>
            <SideColumn />
        </GridContainer>
    );
}

export default Game;
