import React from 'react';
import { StateProvider } from 'store';
import Game from './Game';
import './App.css';

function App() {
    return (
        <StateProvider>
            <div className="App">
                <Game />
            </div>
        </StateProvider>
    );
}

export default App;
