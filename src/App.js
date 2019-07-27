import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StateProvider } from 'store';
import theme from 'style/theme';
import Game from './Game';
import 'style/index.css';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <StateProvider>
                <Game />
            </StateProvider>
        </ThemeProvider>
    );
}

export default App;
