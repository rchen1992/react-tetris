import { BLOCK_TYPES } from 'blocks';
import { css } from 'styled-components';

/**
 * https://uigradients.com/#EmeraldWater
 */
const pageBackgroundCss = css`
    background: #348f50;
    background: -webkit-linear-gradient(to right, #56b4d3, #348f50);
    background: linear-gradient(to right, #56b4d3, #348f50);
`;

const theme = {
    cellSize: '26px',
    gridLineColor: '#273746',
    gridBackgroundColor: '#2E4053',
    gridCoatingColor: '#5D6D7E',
    gridContainerBackgroundColor: '#243B4A',
    pageBackgroundCss,
    blockColors: {
        [BLOCK_TYPES.I]: '#5DADE2',
        [BLOCK_TYPES.L]: '#F39C12',
        [BLOCK_TYPES.J]: '#2471A3',
        [BLOCK_TYPES.S]: '#52BE80',
        [BLOCK_TYPES.Z]: '#E74C3C',
        [BLOCK_TYPES.O]: '#F7DC6F',
        [BLOCK_TYPES.T]: '#9B59B6',
    },
    gridOverlayZIndex: 2,
};

export default theme;
