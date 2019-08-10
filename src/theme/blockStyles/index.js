import Outset from './Outset';
import Inset from './Inset';
import Ridge from './Ridge';
import Groove from './Groove';

export const BLOCK_STYLE_KEYS = {
    STANDARD: 'STANDARD',
    OUTSET: 'OUTSET',
    INSET: 'INSET',
    RIDGE: 'RIDGE',
    GROOVE: 'GROOVE',
};

export default {
    [BLOCK_STYLE_KEYS.STANDARD]: {},
    [BLOCK_STYLE_KEYS.OUTSET]: Outset,
    [BLOCK_STYLE_KEYS.INSET]: Inset,
    [BLOCK_STYLE_KEYS.RIDGE]: Ridge,
    [BLOCK_STYLE_KEYS.GROOVE]: Groove,
};
