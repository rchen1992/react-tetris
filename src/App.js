import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StateProvider } from 'store';
import { getTheme, getRandomTheme } from 'theme';
import { COLOR_PALETTE_KEYS } from 'theme/colorPalettes';
import { BLOCK_STYLE_KEYS } from 'theme/blockStyles';
import Page from './Page';
import 'style/index.css';

function App() {
    const [theme, setTheme] = React.useState(
        getTheme(COLOR_PALETTE_KEYS.EMERALD_WATER, BLOCK_STYLE_KEYS.OUTSET)
    );

    function randomizeTheme() {
        setTheme(getRandomTheme());
    }

    return (
        <ThemeProvider theme={theme}>
            <StateProvider randomizeTheme={randomizeTheme}>
                <Page />
            </StateProvider>
        </ThemeProvider>
    );
}

export default App;
