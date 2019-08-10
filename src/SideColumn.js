import React from 'react';
import styled from 'styled-components';
import { useStore } from 'store';
import NextBlock from './NextBlock';
import { ReactComponent as PauseIcon } from 'assets/icons/pause.svg';
import { ReactComponent as ReplayIcon } from 'assets/icons/replay.svg';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`;

const Controls = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
`;

const ControlButton = styled.div`
    display: inline-flex;
    justify-content: center;
    width: 45%;
    background-color: ${({ theme }) => theme.gridCoatingColor};
    border-radius: 6px;
    padding: 4px;
    transition: background-color 200ms;
    cursor: pointer;

    :hover {
        background-color: ${({ theme }) => theme.gridCoatingColorDarken};
    }

    svg {
        fill: white;
        width: 30px;
        height: 30px;
    }
`;

function SideColumn() {
    const { togglePauseGame, restartGame } = useStore();

    return (
        <Container>
            <NextBlock />
            <Controls>
                <ControlButton onClick={togglePauseGame}>
                    <PauseIcon />
                </ControlButton>
                <ControlButton onClick={restartGame}>
                    <ReplayIcon />
                </ControlButton>
            </Controls>
        </Container>
    );
}

export default SideColumn;
