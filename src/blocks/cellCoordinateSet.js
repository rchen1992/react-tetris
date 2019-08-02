/**
 * Proxy handler that adds custom functionality to a native Set.
 * Transforms coordinate tuple values to strings and vice versa when
 * adding/deleting/checking/retrieving from the Set.
 *
 * Example) [1,2] => '1,2'
 */
const cellCoordinateSetProxyHandler = {
    get(obj, prop) {
        switch (prop) {
            case 'add':
            case 'has':
            case 'delete':
                return (...args) => {
                    const value = args[0];
                    if (!Array.isArray(value) || value.length !== 2) {
                        throw new Error(
                            'Value has to be a tuple representing coordinate values [x,y].'
                        );
                    }

                    return obj[prop](value.toString());
                };
            /**
             * Custom function that returns array of coordinates as tuples instead of strings.
             * Used for easy retrieval of coordinate values.
             */
            case 'keysArray':
                return () => {
                    return Array.from(obj).map(coord => coord.split(','));
                };
            /**
             * Proxy the rest of the Set attributes/methods through with no-op.
             */
            default:
                return () => {
                    if (typeof obj[prop] === 'function') {
                        return obj[prop]();
                    }

                    return obj[prop];
                };
        }
    },
};

/**
 * Returns a Set wrapped in a proxy to represent
 * a set of active cell coordinates.
 */
export function getNewCellCoordinateSet() {
    return new Proxy(new Set(), cellCoordinateSetProxyHandler);
}

/**
 * Use a block's shape, current orientation, and current position on the grid
 * to determine the cell coordinate set for the block.
 *
 * This set will be used to easily determine the coordinates for each individual cell
 * on the grid that a block occupies.
 *
 * @param {object} blockShape - matrix representing block shape
 * @param {tuple} coordinates - `[row, col]`
 */
export default function getBlockCellCoordinateSet(blockShape, coordinates) {
    const [currentBlockRow, currentBlockCol] = coordinates;
    let coords = getNewCellCoordinateSet();

    blockShape.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (cell === 1) {
                const coord = [rowIndex + currentBlockRow, cellIndex + currentBlockCol];
                coords.add(coord);
            }
        });
    });

    return coords;
}
