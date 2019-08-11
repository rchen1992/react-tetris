export const BLOCK_BORDER_KEYS = {
    STANDARD: 'STANDARD',
    OUTSET: 'OUTSET',
    INSET: 'INSET',
    RIDGE: 'RIDGE',
    GROOVE: 'GROOVE',
};

const outset = {
    borderWidth: 3,
    borderType: 'outset',
};

const inset = {
    borderWidth: 3,
    borderType: 'inset',
};

const ridge = {
    borderWidth: 6,
    borderType: 'ridge',
};

const groove = {
    borderWidth: 6,
    borderType: 'groove',
};

export default {
    [BLOCK_BORDER_KEYS.STANDARD]: {},
    [BLOCK_BORDER_KEYS.OUTSET]: outset,
    [BLOCK_BORDER_KEYS.INSET]: inset,
    [BLOCK_BORDER_KEYS.RIDGE]: ridge,
    [BLOCK_BORDER_KEYS.GROOVE]: groove,
};
