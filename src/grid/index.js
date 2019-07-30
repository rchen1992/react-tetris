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
 * @param {Set} coordinateSet - set of [row,col] coordinates for given block
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
 * @param {Set} coordinateSet - set of [row,col] coordinates for given block
 */
export function hasNoBlockCollisions(grid, coordinateSet) {
    return coordinateSet.keysArray().every(([row, col]) => {
        return grid[row][col] === null;
    });
}

/**
 * Returns true if a block's position is valid.
 *
 * @param {array} grid - matrix
 * @param {tuple} coordinates - [row,col] coordinates
 * @param {array} blockShape - matrix
 */
export function isValidBlockMove(grid, coordinates, blockShape) {
    const coordinateSet = getBlockCellCoordinateSet(blockShape, coordinates);
    return isWithinGridBounds(grid, coordinateSet) && hasNoBlockCollisions(grid, coordinateSet);
}

/**
 * Takes a grid and returns a new grid that has filled rows removed.
 *
 * @param {array} grid - matrix
 */
export function clearFilledRows(grid) {
    // Get all rows that are NOT completely filled.
    const unfilledRows = grid.filter(row => row.some(cell => cell === null));

    // Get number of rows cleared.
    const clearedRowCount = grid.length - unfilledRows.length;

    /**
     * If we cleared any rows,
     * we need to remove those rows from the grid.
     */
    if (clearedRowCount > 0) {
        /**
         * Create a grid that is the same size as the cleared rows,
         * and combine it with the grid of uncleared rows.
         */
        return [...createGrid(clearedRowCount, grid[0].length), ...unfilledRows];
    } else {
        return grid;
    }
}
