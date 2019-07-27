/**
 * Proxy handler for proxying a Set.
 * Transforms coordinate tuple values to strings when
 * adding/retrieving from the Set.
 *
 * Example) [1,2] => '1,2'
 */
const cellCoordinateMapProxyHandler = {
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
function getNewCellCoordinateMap() {
    return new Proxy(new Set(), cellCoordinateMapProxyHandler);
}

/**
 * Use a block's shape, current orientation, and current position on the grid
 * to determine the cell coordinate map for the current block.
 *
 * This mapping will be used to describe the coordinates for the cells
 * on the grid that should be marked "active" because the current block
 * is occupying that cell.
 *
 * @param {object} block - object repesenting a block
 * @param {tuple} currentBlockCoordinates - `[row, col]`
 */
export default function getCurrentBlockCellCoordinateMap(block, currentBlockCoordinates) {
    const [currentBlockRow, currentBlockCol] = currentBlockCoordinates;

    let coords = getNewCellCoordinateMap();
    block.shape.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (cell === 1) {
                const coord = [rowIndex + currentBlockRow, cellIndex + currentBlockCol];
                coords.add(coord);
            }
        });
    });

    return coords;
}
