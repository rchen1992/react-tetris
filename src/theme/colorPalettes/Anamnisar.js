import { BLOCK_TYPES } from 'blocks';
import { css } from 'styled-components';
import { darken } from 'polished';

/**
 * https://uigradients.com/#Anamnisar
 */
const pageBackgroundCss = css`
    background: #9796f0;
    background: -webkit-linear-gradient(to right, #fbc7d4, #9796f0);
    background: linear-gradient(to right, #fbc7d4, #9796f0);
`;

const gameStateMenuColor = '#ADA7C9';
const gridCoatingColor = '#ADA7C9';

const palette = {
    gridLineColor: '#ccadb1',
    gridBackgroundColor: '#f3d3d7',
    gridCoatingColor,
    gridCoatingColorDarken: darken(0.1, gridCoatingColor),
    gridContainerBackgroundColor: '#D7B9D5',
    pageBackgroundCss,
    gameStateMenuColor,
    gameStateMenuColorHover: darken(0.1, gameStateMenuColor),
    blockColors: {
        [BLOCK_TYPES.I]: '#b6ffea',
        [BLOCK_TYPES.L]: '#64A6BD',
        [BLOCK_TYPES.J]: '#ff8a5c',
        [BLOCK_TYPES.S]: '#f0f696',
        [BLOCK_TYPES.Z]: '#f5b5fc',
        [BLOCK_TYPES.O]: '#cf455c',
        [BLOCK_TYPES.T]: '#a0cc78',
    },
};

export default palette;
