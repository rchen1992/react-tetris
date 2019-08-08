import React from 'react';
import Game from './Game';
import styled from 'styled-components';

const StyledPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    ${({ theme }) => theme.pageBackgroundCss};
`;

function Page() {
    return (
        <StyledPage>
            <Game />
        </StyledPage>
    );
}

export default Page;
