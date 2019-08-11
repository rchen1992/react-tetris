import BaseTheme from './BaseTheme';
import colorPalettes, { COLOR_PALETTE_KEYS } from './colorPalettes';
import blockBorders, { BLOCK_BORDER_KEYS } from './blockStyles/border';
import blockBorderRadiuses, { BLOCK_BORDER_RADIUS_KEYS } from './blockStyles/borderRadius';

function getRandomObjectKey(obj) {
    const objKeys = Object.keys(obj);
    return objKeys[Math.floor(Math.random() * objKeys.length)];
}

export function getTheme(colorPalette, blockBorder, blockBorderRadius) {
    return {
        ...BaseTheme,
        ...colorPalettes[colorPalette],
        blockStyles: {
            ...blockBorders[blockBorder],
            ...blockBorderRadiuses[blockBorderRadius],
        },
    };
}

export function getRandomTheme() {
    const randomColorPalette = getRandomObjectKey(colorPalettes);
    const randomBlockBorder = getRandomObjectKey(blockBorders);
    const randomBlockBorderRadius = getRandomObjectKey(blockBorderRadiuses);

    return getTheme(randomColorPalette, randomBlockBorder, randomBlockBorderRadius);
}

export function getDefaultTheme() {
    return getTheme(
        COLOR_PALETTE_KEYS.EMERALD_WATER,
        BLOCK_BORDER_KEYS.OUTSET,
        BLOCK_BORDER_RADIUS_KEYS.STANDARD
    );
}
