import { BLOCK_TYPES } from 'blocks';
import { css } from 'styled-components';
import { darken } from 'polished';

/**
 * https://uigradients.com/#EasyMed
 */
const pageBackgroundCss = css`
    background: #dce35b;
    background: -webkit-linear-gradient(to right, #45b649, #dce35b);
    background: linear-gradient(to right, #45b649, #dce35b);
`;

const gameStateMenuColor = '#F0EC57';
const gridCoatingColor = '#F0EC57';

const palette = {
    gridLineColor: '#c4d297',
    gridBackgroundColor: '#d2e0a3',
    gridCoatingColor,
    gridCoatingColorDarken: darken(0.1, gridCoatingColor),
    gridContainerBackgroundColor: '#C0DA74',
    pageBackgroundCss,
    gameStateMenuColor,
    gameStateMenuColorHover: darken(0.1, gameStateMenuColor),
    blockColors: {
        [BLOCK_TYPES.I]: '#cf455c',
        [BLOCK_TYPES.L]: '#23CE6B',
        [BLOCK_TYPES.J]: '#84A98C',
        [BLOCK_TYPES.S]: '#C69F89',
        [BLOCK_TYPES.Z]: '#F4D35E',
        [BLOCK_TYPES.O]: '#35b0ab',
        [BLOCK_TYPES.T]: '#ff8a5c',
    },
};

export default palette;
