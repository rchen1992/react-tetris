export const BLOCK_TYPES = {
    I: 'I',
    L: 'L',
    J: 'J',
    Z: 'Z',
    S: 'S',
    O: 'O',
    T: 'T',
};

export const MOVEMENT_DIRECTIONS = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
};

const blocks = {
    [BLOCK_TYPES.I]: {
        type: BLOCK_TYPES.I,
        // prettier-ignore
        shape: [
            [1, 1, 1, 1],
        ]
    },
    [BLOCK_TYPES.L]: {
        type: BLOCK_TYPES.L,
        // prettier-ignore
        shape: [
            [0, 0, 1,],
            [1, 1, 1,],
        ]
    },
    [BLOCK_TYPES.J]: {
        type: BLOCK_TYPES.J,
        // prettier-ignore
        shape: [
            [1, 0, 0,],
            [1, 1, 1,],
        ]
    },
    [BLOCK_TYPES.Z]: {
        type: BLOCK_TYPES.Z,
        // prettier-ignore
        shape: [
            [1, 1, 0,],
            [0, 1, 1,],
        ]
    },
    [BLOCK_TYPES.S]: {
        type: BLOCK_TYPES.S,
        // prettier-ignore
        shape: [
            [0, 1, 1,],
            [1, 1, 0,],
        ]
    },
    [BLOCK_TYPES.O]: {
        type: BLOCK_TYPES.O,
        // prettier-ignore
        shape: [
            [1, 1],
            [1, 1],
        ]
    },
    [BLOCK_TYPES.T]: {
        type: BLOCK_TYPES.T,
        // prettier-ignore
        shape: [
            [0, 1, 0],
            [1, 1, 1],
        ]
    },
};

const blockArray = Object.values(blocks);

/**
 * Returns a random block from the list of available blocks.
 */
export function getRandomNewBlock() {
    return blockArray[Math.floor(Math.random() * blockArray.length)];
}

export default blocks;
