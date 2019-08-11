import { BLOCK_TYPES } from 'blocks';
import { css } from 'styled-components';
import { darken } from 'polished';

/**
 * https://uigradients.com/#Peach
 */
const pageBackgroundCss = css`
    background: #ed4264;
    background: -webkit-linear-gradient(to right, #ffedbc, #ed4264);
    background: linear-gradient(to right, #ffedbc, #ed4264);
`;

const gameStateMenuColor = '#ea8c9a';
const gridCoatingColor = '#ea8c9a';

const palette = {
    gridLineColor: '#f3cfd4',
    gridBackgroundColor: '#f3dcdf',
    gridCoatingColor,
    gridCoatingColorDarken: darken(0.1, gridCoatingColor),
    gridContainerBackgroundColor: '#ffcbcb',
    pageBackgroundCss,
    gameStateMenuColor,
    gameStateMenuColorHover: darken(0.1, gameStateMenuColor),
    blockColors: {
        [BLOCK_TYPES.I]: '#ab4860',
        [BLOCK_TYPES.L]: '#207561',
        [BLOCK_TYPES.J]: '#fce2ae',
        [BLOCK_TYPES.S]: '#c7f0db',
        [BLOCK_TYPES.Z]: '#FF6978',
        [BLOCK_TYPES.O]: '#FE5F00',
        [BLOCK_TYPES.T]: '#B388EB',
    },
};

export default palette;
