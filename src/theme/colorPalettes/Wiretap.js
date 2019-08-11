import { BLOCK_TYPES } from 'blocks';
import { css } from 'styled-components';
import { darken } from 'polished';

/**
 * https://uigradients.com/#Wiretap
 */
const pageBackgroundCss = css`
    background: #8a2387;
    background: -webkit-linear-gradient(to right, #f27121, #e94057, #8a2387);
    background: linear-gradient(to right, #f27121, #e94057, #8a2387);
`;

const gameStateMenuColor = '#F0544F';
const gridCoatingColor = '#F0544F';

const palette = {
    gridLineColor: '#3c1b3a',
    gridBackgroundColor: '#331832',
    gridCoatingColor,
    gridCoatingColorDarken: darken(0.1, gridCoatingColor),
    gridContainerBackgroundColor: '#D81E5B',
    pageBackgroundCss,
    gameStateMenuColor,
    gameStateMenuColorHover: darken(0.1, gameStateMenuColor),
    blockColors: {
        [BLOCK_TYPES.I]: '#ad1d45',
        [BLOCK_TYPES.L]: '#CCFF99',
        [BLOCK_TYPES.J]: '#FF33CC',
        [BLOCK_TYPES.S]: '#9933FF',
        [BLOCK_TYPES.Z]: '#009999',
        [BLOCK_TYPES.O]: '#0000FF',
        [BLOCK_TYPES.T]: '#fff6da',
    },
};

export default palette;
