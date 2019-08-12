import { BLOCK_TYPES } from 'blocks';
import { css } from 'styled-components';
import { darken } from 'polished';

/**
 * https://uigradients.com/#Timber
 */
const pageBackgroundCss = css`
    background: #fc00ff;
    background: -webkit-linear-gradient(to right, #00dbde, #fc00ff);
    background: linear-gradient(to right, #00dbde, #fc00ff);
`;

const gameStateMenuColor = '#8E94F2';
const gridCoatingColor = '#8E94F2';

const palette = {
    gridLineColor: '#214567',
    gridBackgroundColor: '#00494e',
    gridCoatingColor,
    gridCoatingColorDarken: darken(0.1, gridCoatingColor),
    gridContainerBackgroundColor: '#BBADFF',
    pageBackgroundCss,
    gameStateMenuColor,
    gameStateMenuColorHover: darken(0.1, gameStateMenuColor),
    blockColors: {
        [BLOCK_TYPES.I]: '#89CE94',
        [BLOCK_TYPES.L]: '#F5EE9E',
        [BLOCK_TYPES.J]: '#A6ECE0',
        [BLOCK_TYPES.S]: '#EC0868',
        [BLOCK_TYPES.Z]: '#FCAB10',
        [BLOCK_TYPES.O]: '#2B9EB3',
        [BLOCK_TYPES.T]: '#FF928B',
    },
};

export default palette;
