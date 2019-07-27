import React from 'react';
import { useStore } from 'store';

function Game() {
    const { grid } = useStore();
    console.log(grid);
    return <div>{grid}</div>;
}

export default Game;
