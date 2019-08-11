import EmeraldWater from './EmeraldWater';
import Anamnisar from './Anamnisar';
import Wiretap from './Wiretap';
import Mini from './Mini';
import Coal from './Coal';
import Peach from './Peach';

export const COLOR_PALETTE_KEYS = {
    EMERALD_WATER: 'EMERALD_WATER',
    ANAMNISAR: 'ANAMNISAR',
    WIRETAP: 'WIRETAP',
    MINI: 'MINI',
    COAL: 'COAL',
    PEACH: 'PEACH',
};

export default {
    [COLOR_PALETTE_KEYS.EMERALD_WATER]: EmeraldWater,
    [COLOR_PALETTE_KEYS.ANAMNISAR]: Anamnisar,
    [COLOR_PALETTE_KEYS.WIRETAP]: Wiretap,
    [COLOR_PALETTE_KEYS.MINI]: Mini,
    [COLOR_PALETTE_KEYS.COAL]: Coal,
    [COLOR_PALETTE_KEYS.PEACH]: Peach,
};
