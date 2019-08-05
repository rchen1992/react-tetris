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
 * Returns true if coordinates are within the right edge of the grid.
 *
 * @param {array} grid - matrix
 * @param {tuple} coordinates - [row,col] coordinates
 * @param {array} blockShape - matrix
 */
export function isWithinGridRightEdge(grid, coordinates, blockShape) {
    const coordinateSet = getBlockCellCoordinateSet(blockShape, coordinates);
    return coordinateSet.keysArray().every(([row, col]) => {
        return col < grid[0].length;
    });
}

/**
 * Returns true if the given block's position does not collide
 * with another block on the grid.
 *
 * Note: if the block is out of grid bounds,
 * it is technically NOT colliding with an existing block,
 * and so this will return true.
 *
 * @param {array} grid - matrix
 * @param {Set} coordinateSet - set of [row,col] coordinates for given block
 */
export function hasNoBlockCollisions(grid, coordinateSet) {
    return coordinateSet.keysArray().every(([row, col]) => {
        return grid[row] === undefined || grid[row][col] === null;
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

/**
 * Returns the coordinates for the lowest possible
 * position on the grid that a block can be in,
 * given its current position and shape.
 *
 * Useful for dropping a block instantly or finding the ghost block.
 *
 * @param {array} grid - matrix
 * @param {tuple} coordinates
 * @param {array} blockShape - matrix
 */
export function findLowestAvailableBlockPosition(grid, coordinates, blockShape) {
    /**
     * Continually move block downwards and check if it is a valid move.
     * As soon as it is invalid, we know the final location for the block
     * should be just before the last move.
     */
    const [row, col] = coordinates;
    let rowMove = 1;
    while (isValidBlockMove(grid, [row + rowMove, col], blockShape)) {
        rowMove += 1;
    }

    /**
     * New coordinates are at `rowMove - 1`
     * because we went past the last valid position for a block.
     */
    return [row + rowMove - 1, col];
}
