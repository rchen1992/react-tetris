function flipMatrix(matrix) {
    return matrix[0].map((column, index) => matrix.map(row => row[index]));
}

function rotateMatrixClockwise(matrix) {
    return flipMatrix([...matrix].reverse());
}

/**
 * Returns a new rotated version of a block shape matrix.
 *
 * @param {array} block - matrix
 */
export default function rotateBlock(blockShape) {
    return rotateMatrixClockwise(blockShape);
}
