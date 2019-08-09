import React from 'react';
import Game from './Game';
import styled from 'styled-components';

const StyledPage = styled.div`
    min-height: 100vh;
    ${({ theme }) => theme.pageBackgroundCss};
`;

const GameArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
`;

const Header = styled.div`
    padding: 20px;
    min-height: 10vh;
    color: white;
    font-size: 20px;
`;

function Page() {
    return (
        <StyledPage>
            <Header>React Tetris</Header>
            <GameArea>
                <Game />
            </GameArea>
        </StyledPage>
    );
}

export default Page;
