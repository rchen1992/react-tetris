import { getRandomNewBlock } from 'blocks';
import getBlockCellCoordinateSet from 'blocks/cellCoordinateSet';
import { createGrid } from 'grid';
import GAME_STATES from 'constants/gameStates';
import GAME_SPEEDS from 'constants/gameSpeeds';

export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

export const STARTING_BLOCK_COORDINATES = [0, 3];

const startingBlock = getRandomNewBlock();

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
    gameSpeed: GAME_SPEEDS.STARTING,
    gameState: GAME_STATES.NEW_GAME,
};
