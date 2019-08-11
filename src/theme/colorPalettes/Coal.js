import { BLOCK_TYPES } from 'blocks';
import { css } from 'styled-components';
import { darken } from 'polished';

/**
 * https://uigradients.com/#Coal
 */
const pageBackgroundCss = css`
    background: #eb5757;
    background: -webkit-linear-gradient(to right, #000000, #eb5757);
    background: linear-gradient(to right, #000000, #eb5757);
`;

const gameStateMenuColor = '#da5e5d';
const gridCoatingColor = '#da5e5d';

const palette = {
    gridLineColor: '#522327',
    gridBackgroundColor: '#461f22',
    gridCoatingColor,
    gridCoatingColorDarken: darken(0.1, gridCoatingColor),
    gridContainerBackgroundColor: '#943131',
    pageBackgroundCss,
    gameStateMenuColor,
    gameStateMenuColorHover: darken(0.1, gameStateMenuColor),
    blockColors: {
        [BLOCK_TYPES.I]: '#33FF00',
        [BLOCK_TYPES.L]: '#da00ff',
        [BLOCK_TYPES.J]: '#FF0000',
        [BLOCK_TYPES.S]: '#FAFAFA',
        [BLOCK_TYPES.Z]: '#ff7600',
        [BLOCK_TYPES.O]: '#33FFFF',
        [BLOCK_TYPES.T]: '#FFFF00',
    },
};

export default palette;
