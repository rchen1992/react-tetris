import React from 'react';
import { useStore } from 'store';
import styled from 'styled-components';

const Container = styled.div`
    width: 100px;
    height: 100px;
    background-color: blue;
`;

function Game() {
    const { grid } = useStore();
    return <Container>{grid}</Container>;
}

export default Game;
