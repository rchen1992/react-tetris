import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StateProvider } from 'store';
import theme from 'style/theme';
import Page from './Page';
import 'style/index.css';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <StateProvider>
                <Page />
            </StateProvider>
        </ThemeProvider>
    );
}

export default App;
