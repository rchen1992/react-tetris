export const BLOCK_BORDER_RADIUS_KEYS = {
    STANDARD: 'STANDARD',
    ROUNDED: 'ROUNDED',
    CIRCULAR: 'CIRCULAR',
};

const rounded = {
    borderRadius: '6px',
};

const circular = {
    borderRadius: '50%',
};

export default {
    [BLOCK_BORDER_RADIUS_KEYS.STANDARD]: {},
    [BLOCK_BORDER_RADIUS_KEYS.ROUNDED]: rounded,
    [BLOCK_BORDER_RADIUS_KEYS.CIRCULAR]: circular,
};
