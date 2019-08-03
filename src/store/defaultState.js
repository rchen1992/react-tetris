import { getRandomNewBlock } from 'blocks';
import { createGrid } from 'grid';
import GAME_STATES from 'constants/gameStates';
import GAME_SPEEDS from 'constants/gameSpeeds';

export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

export const STARTING_BLOCK_COORDINATES = [0, 3];

export default {
    grid: createGrid(GRID_HEIGHT, GRID_WIDTH),
    currentBlock: {
        properties: getRandomNewBlock(),
        positionCoordinates: STARTING_BLOCK_COORDINATES,
    },
    gameSpeed: GAME_SPEEDS.STARTING,
    gameState: GAME_STATES.NEW_GAME,
};
