import React from 'react';
import { useStore } from 'store';
import styled, { css } from 'styled-components';
import { math } from 'polished';
import useKeyboardListeners from 'hooks/useKeyboardListeners';
import { MOVEMENT_DIRECTIONS } from 'blocks/movement';
import { CLEAR_ROW_ANIMATION_DURATION, clearRowAnimation } from 'style/animations';
import GAME_STATES from 'constants/gameStates';
import NextBlock from './NextBlock';

const GridContainer = styled.div`
    display: inline-flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.gridContainerBackgroundColor};
    padding: 40px;
    border-radius: 10px;
    margin: auto;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const GridCoating = styled.div`
    padding: 6px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.gridCoatingColor};
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.width}, ${props.theme.cellSize})`};
    grid-template-rows: ${props => `repeat(${props.height}, ${props.theme.cellSize})`};
    width: ${props => math(`${props.theme.cellSize} * ${props.width}`)};
    position: relative;
`;

const GridCell = styled.span`
    border: 1px solid ${({ theme }) => theme.gridLineColor};
    background-color: ${props => {
        return props.theme.gridBackgroundColor;
    }};
`;

const InnerCell = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${props => {
        return props.theme.blockColors[props.blockType] || 'transparent';
    }};
    opacity: ${props => (props.isGhostBlock ? 0.5 : 1)};

    ${props =>
        props.animatingClear &&
        css`
            animation: ${clearRowAnimation} ${CLEAR_ROW_ANIMATION_DURATION}ms;
            animation-fill-mode: forwards;
        `};
`;

const GridOverlay = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${props => (props.type === 'dark' ? 'hsla(0, 0%, 0%, 0.45)' : 'white')};
    z-index: ${({ theme }) => theme.gridOverlayZIndex};
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NewGameButton = styled.button`
    background-color: #87a4b0;
    border: none;
    padding: 10px 20px;
    color: white;
    border-radius: 6px;
`;

const GameStateMenu = styled.div`
    background-color: white;
    padding: 20px;
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
        restartGame,
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
            for (let j = 0; j < grid[i].length; j++) {
                let blockType = grid[i][j];
                const isGhostBlock = ghostBlockCellCoordinateSet.has([i, j]);
                const isCurrentBlock = currentBlockCellCoordinateSet.has([i, j]);

                if (!blockType && (isCurrentBlock || isGhostBlock)) {
                    blockType = currentBlock.properties.type;
                }

                cells.push(
                    <GridCell key={`${i}${j}`}>
                        <InnerCell
                            blockType={blockType}
                            isGhostBlock={isGhostBlock && !isCurrentBlock}
                            animatingClear={animatedRows.includes(i)}
                        />
                    </GridCell>
                );
            }
        }
        return cells;
    }

    return (
        <GridContainer>
            <GridCoating>
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
                            <GameStateMenu>
                                <p>Game Over</p>
                                <button onClick={restartGame}>Restart</button>
                            </GameStateMenu>
                        </GridOverlay>
                    )}

                    {renderGrid()}
                </Grid>
            </GridCoating>
            <div onClick={togglePauseGame}>Pause</div>
            <NextBlock />
        </GridContainer>
    );
}

export default Game;
