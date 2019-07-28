import blocks, { BLOCK_TYPES } from 'blocks';
import getCurrentBlockCellCoordinateMap from 'blocks/cellCoordinateMap';
import { createGrid } from 'grid';

export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

const startingBlockCoordinates = [0, 3];
const startingBlock = blocks[BLOCK_TYPES.T];

export default {
    grid: createGrid(GRID_HEIGHT, GRID_WIDTH),
    currentBlock: {
        properties: startingBlock,
        positionCoordinates: startingBlockCoordinates,
    },
    currentBlockCellCoordinateMap: getCurrentBlockCellCoordinateMap(
        startingBlock.shape,
        startingBlockCoordinates
    ),
};
