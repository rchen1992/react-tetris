import { BLOCK_TYPES } from 'blocks';
import { css } from 'styled-components';
import { darken } from 'polished';

/**
 * https://uigradients.com/#EmeraldWater
 */
const pageBackgroundCss = css`
    background: #30e8bf;
    background: -webkit-linear-gradient(to right, #ff8235, #30e8bf);
    background: linear-gradient(to right, #ff8235, #30e8bf);
`;

const gameStateMenuColor = '#f7863b';
const gridCoatingColor = '#f7863b';

const palette = {
    gridLineColor: '#582d11',
    gridBackgroundColor: '#502304',
    gridCoatingColor,
    gridCoatingColorDarken: darken(0.1, gridCoatingColor),
    gridContainerBackgroundColor: '#FFD97D',
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
