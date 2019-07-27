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
    [BLOCK_TYPES.T]: {
        // prettier-ignore
        shape: [
            [0, 1, 0],
            [1, 1, 1],
        ]
    },
};

export default blocks;
