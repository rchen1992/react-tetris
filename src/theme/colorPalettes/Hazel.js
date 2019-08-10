import { BLOCK_TYPES } from 'blocks';
import { css } from 'styled-components';
import { darken } from 'polished';

/**
 * https://uigradients.com/#Hazel
 */
const pageBackgroundCss = css`
    background: #77a1d3;
    background: -webkit-linear-gradient(to right, #e684ae, #79cbca, #77a1d3);
    background: linear-gradient(to right, #e684ae, #79cbca, #77a1d3);
`;

const gameStateMenuColor = '#87a4b0';
const gridCoatingColor = '#5D6D7E';

const palette = {
    gridLineColor: '#273746',
    gridBackgroundColor: '#2E4053',
    gridCoatingColor,
    gridCoatingColorDarken: darken(0.1, gridCoatingColor),
    gridContainerBackgroundColor: '#243B4A',
    pageBackgroundCss,
    gameStateMenuColor,
    gameStateMenuColorHover: darken(0.1, gameStateMenuColor),
    blockColors: {
        [BLOCK_TYPES.I]: '#5DADE2',
        [BLOCK_TYPES.L]: '#F39C12',
        [BLOCK_TYPES.J]: '#2471A3',
        [BLOCK_TYPES.S]: '#52BE80',
        [BLOCK_TYPES.Z]: '#E74C3C',
        [BLOCK_TYPES.O]: '#F7DC6F',
        [BLOCK_TYPES.T]: '#9B59B6',
    },
};

export default palette;
