export const BLOCK_TYPES = {
    I: 'I',
    L: 'L',
    J: 'J',
    Z: 'Z',
    S: 'S',
    O: 'O',
    T: 'T',
};

const blocks = {
    [BLOCK_TYPES.I]: {
        // prettier-ignore
        shape: [
            [1, 1, 1, 1],
        ]
    },
    [BLOCK_TYPES.L]: {
        // prettier-ignore
        shape: [
            [0, 0, 1,],
            [1, 1, 1,],
        ]
    },
    [BLOCK_TYPES.J]: {
        // prettier-ignore
        shape: [
            [1, 0, 0,],
            [1, 1, 1,],
        ]
    },
    [BLOCK_TYPES.Z]: {
        // prettier-ignore
        shape: [
            [1, 1, 0,],
            [0, 1, 1,],
        ]
    },
    [BLOCK_TYPES.S]: {
        // prettier-ignore
        shape: [
            [0, 1, 1,],
            [1, 1, 0,],
        ]
    },
    [BLOCK_TYPES.O]: {
        // prettier-ignore
        shape: [
            [1, 1],
            [1, 1],
        ]
    },
    [BLOCK_TYPES.T]: {
        // prettier-ignore
        shape: [
            [0, 1, 0],
            [1, 1, 1],
        ]
    },
};

export default blocks;
