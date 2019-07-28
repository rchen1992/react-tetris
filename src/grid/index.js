export function createGrid(height, width) {
    return Array(height).fill(Array(width).fill(null));
}

/**
 * Returns true if coordinates are within grid bounds.
 *
 * @param {array} grid
 * @param {tuple} coordinates
 * @param {object} blockShape
 */
export function isWithinGridBounds(grid, coordinates, blockShape) {
    const [row, col] = coordinates;
    const currentBlockRowSpan = blockShape.length;
    const currentBlockColSpan = blockShape[0].length;

    /**
     * Explanation for this weird condition:
     * `col < grid[0].length - currentBlockColSpan + 1`
     *
     * We have to account for the current block's row and col span
     * when checking the bounds.
     *
     * In the example below:
     * - `coordinates` is [1, 6]
     * - `blockShape` is the `I` block: `[ [1, 1, 1, 1] ]`
     *
     * So we use the check to see if we are at the end
     * of right side of the grid.
     * The same logic applies for the bottom of the grid.
     *
     * [0][0][0][0][0][0][0][0][0][0]
     * [0][0][0][0][0][0][1][1][1][1]
     * [0][0][0][0][0][0][0][0][0][0]
     * [0][0][0][0][0][0][0][0][0][0]
     * [0][0][0][0][0][0][0][0][0][0]
     * [0][0][0][0][0][0][0][0][0][0]
     * [0][0][0][0][0][0][0][0][0][0]
     */
    return (
        row >= 0 &&
        row < grid.length - currentBlockRowSpan + 1 &&
        col >= 0 &&
        col < grid[0].length - currentBlockColSpan + 1
    );
}
