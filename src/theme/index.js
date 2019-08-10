import BaseTheme from './BaseTheme';
import colorPalettes from './colorPalettes';
import blockStyles from './blockStyles';

function getRandomObjectKey(obj) {
    const objKeys = Object.keys(obj);
    return objKeys[Math.floor(Math.random() * objKeys.length)];
}

export function getTheme(colorPalette, blockStyle) {
    return {
        ...BaseTheme,
        ...colorPalettes[colorPalette],
        ...blockStyles[blockStyle],
    };
}

export function getRandomTheme() {
    const randomColorPalette = getRandomObjectKey(colorPalettes);
    const randomBlockStyle = getRandomObjectKey(blockStyles);

    return getTheme(randomColorPalette, randomBlockStyle);
}
