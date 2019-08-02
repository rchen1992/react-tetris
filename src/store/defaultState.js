import blocks, { BLOCK_TYPES } from 'blocks';
import getBlockCellCoordinateSet from 'blocks/cellCoordinateSet';
import { createGrid } from 'grid';

export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

export const STARTING_BLOCK_COORDINATES = [0, 3];

export const STARTING_GAME_SPEED = 750;

const startingBlock = blocks[BLOCK_TYPES.T];

export default {
    grid: createGrid(GRID_HEIGHT, GRID_WIDTH),
    currentBlock: {
        properties: startingBlock,
        positionCoordinates: STARTING_BLOCK_COORDINATES,
    },
    currentBlockCellCoordinateSet: getBlockCellCoordinateSet(
        startingBlock.shape,
        STARTING_BLOCK_COORDINATES
    ),
    gameSpeed: STARTING_GAME_SPEED,
};
