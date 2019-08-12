import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StateProvider } from 'store';
import { getDefaultTheme, getRandomTheme } from 'theme';
import Page from './Page';
import 'style/index.css';

function App() {
    const [theme, setTheme] = React.useState(getDefaultTheme());

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
