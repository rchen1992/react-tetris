import blocks, { BLOCK_TYPES } from 'blocks';
import getCurrentBlockCellCoordinateMap from 'blocks/cellCoordinateMap';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

function createGrid(height, width) {
    return Array(height).fill(Array(width).fill(null));
}

const startingBlockCoordinates = [0, 0];
const startingBlock = blocks[BLOCK_TYPES.T];

export default {
    grid: createGrid(GRID_HEIGHT, GRID_WIDTH),
    currentBlock: {
        properties: startingBlock,
        positionCoordinates: startingBlockCoordinates,
        cellCoordinateMap: getCurrentBlockCellCoordinateMap(
            startingBlock,
            startingBlockCoordinates
        ),
    },
};
