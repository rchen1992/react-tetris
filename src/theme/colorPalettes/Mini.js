import { BLOCK_TYPES } from 'blocks';
import { css } from 'styled-components';
import { darken } from 'polished';

/**
 * https://uigradients.com/#Mini
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
        [BLOCK_TYPES.I]: '#EDFF86',
        [BLOCK_TYPES.L]: '#B2E6D4',
        [BLOCK_TYPES.J]: '#E952DE',
        [BLOCK_TYPES.S]: '#EA526F',
        [BLOCK_TYPES.Z]: '#5C7AFF',
        [BLOCK_TYPES.O]: '#EFEA5A',
        [BLOCK_TYPES.T]: '#23B5D3',
    },
};

export default palette;
