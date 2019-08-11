import EmeraldWater from './EmeraldWater';
import Anamnisar from './Anamnisar';
import Wiretap from './Wiretap';
import Mini from './Mini';

export const COLOR_PALETTE_KEYS = {
    EMERALD_WATER: 'EMERALD_WATER',
    ANAMNISAR: 'ANAMNISAR',
    WIRETAP: 'WIRETAP',
    MINI: 'MINI',
};

export default {
    [COLOR_PALETTE_KEYS.EMERALD_WATER]: EmeraldWater,
    [COLOR_PALETTE_KEYS.ANAMNISAR]: Anamnisar,
    [COLOR_PALETTE_KEYS.WIRETAP]: Wiretap,
    [COLOR_PALETTE_KEYS.MINI]: Mini,
};
