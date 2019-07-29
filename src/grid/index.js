import getBlockCellCoordinateSet from 'blocks/cellCoordinateSet';

export function createGrid(height, width) {
    return Array(height).fill(Array(width).fill(null));
}

/**
 * Deep clone of a grid/matrix.
 * @param {array} grid - matrix
 */
export function cloneGrid(grid) {
    return grid.map(row => {
        return row.slice();
    });
}

/**
 * Returns true if coordinates are within grid bounds.
 *
 * @param {array} grid
 * @param {Set} coordinateSet - set of [row,col] coordinates
 */
export function isWithinGridBounds(grid, coordinateSet) {
    return coordinateSet.keysArray().every(([row, col]) => {
        return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length;
    });
}

/**
 * Returns true if the given block's position does not collide
 * with another block on the grid.
 *
 * @param {array} grid - matrix
 * @param {Set} coordinateSet - set of [row,col] coordinates
 */
export function hasNoBlockCollisions(grid, coordinateSet) {
    return coordinateSet.keysArray().every(([row, col]) => {
        return grid[row][col] === null;
    });
}

/**
 * Returns true if the given block's position does not collide
 * with another block on the grid.
 *
 * @param {array} grid - matrix
 * @param {tuple} coordinates - [row,col] coordinates
 * @param {array} blockShape - matrix
 */
export function isValidBlockMove(grid, coordinates, blockShape) {
    const coordinateSet = getBlockCellCoordinateSet(blockShape, coordinates);
    return isWithinGridBounds(grid, coordinateSet) && hasNoBlockCollisions(grid, coordinateSet);
}
