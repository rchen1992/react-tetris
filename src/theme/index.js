import BaseTheme from './BaseTheme';
import colorPalettes, { COLOR_PALETTE_KEYS } from './colorPalettes';
import blockBorders, { BLOCK_BORDER_KEYS } from './blockStyles/border';
import blockBorderRadiuses, { BLOCK_BORDER_RADIUS_KEYS } from './blockStyles/borderRadius';
import { shuffle } from 'lodash';

let unseenColorPalettes = getShuffledColorPalettesKeys();

function getRandomObjectKey(obj) {
    const objKeys = Object.keys(obj);
    return objKeys[Math.floor(Math.random() * objKeys.length)];
}

function getShuffledColorPalettesKeys() {
    return [...shuffle(Object.keys(colorPalettes))];
}

/**
 * Not really random because we want each theme
 * to be shown once before being randomly shuffled again.
 */
function getRandomColorPaletteKey() {
    if (unseenColorPalettes.length === 0) {
        unseenColorPalettes = getShuffledColorPalettesKeys();
    }

    const palette = unseenColorPalettes[0];
    unseenColorPalettes = unseenColorPalettes.slice(1);

    return palette;
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
    const randomColorPalette = getRandomColorPaletteKey();
    const randomBlockBorder = getRandomObjectKey(blockBorders);
    const randomBlockBorderRadius = getRandomObjectKey(blockBorderRadiuses);

    return getTheme(randomColorPalette, randomBlockBorder, randomBlockBorderRadius);
}

export function getDefaultTheme() {
    return getTheme(
        COLOR_PALETTE_KEYS.EASY_MED,
        BLOCK_BORDER_KEYS.OUTSET,
        BLOCK_BORDER_RADIUS_KEYS.STANDARD
    );
}
