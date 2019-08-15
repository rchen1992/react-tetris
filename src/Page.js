import React from 'react';
import Game from './Game';
import styled from 'styled-components';
import { useStore } from 'store';
import Title from './Title';
import { fadeOut, GRID_ANIMATION_DELAY } from 'style/animations';

const StyledPage = styled.div`
    min-height: 100vh;
    ${({ theme }) => theme.pageBackgroundCss};
`;

const GameArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 0 20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;
    min-height: 10vh;
    color: white;
`;

const RandomizeButton = styled.div`
    color: white;
    background-color: transparent;
    border: 2px solid white;
    border-radius: 6px;
    padding: 10px;
    font-size: 12px;
    cursor: pointer;
    transition: all 200ms;
    opacity: 0;

    animation: ${fadeOut} 200ms;
    animation-direction: reverse;
    animation-fill-mode: forwards;
    animation-delay: ${GRID_ANIMATION_DELAY}ms;

    :hover {
        color: #ccd1d1;
        border-color: #ccd1d1;
        transform: translateY(-2px);
    }
`;

function Page() {
    const { randomizeTheme } = useStore();

    return (
        <StyledPage>
            <Header>
                <Title />
                <RandomizeButton onClick={randomizeTheme}>Randomize Theme</RandomizeButton>
            </Header>
            <GameArea>
                <Game />
            </GameArea>
        </StyledPage>
    );
}

export default Page;
