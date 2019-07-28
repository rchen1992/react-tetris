function flipMatrix(matrix) {
    return matrix[0].map((column, index) => matrix.map(row => row[index]));
}

function rotateMatrixClockwise(matrix) {
    return flipMatrix([...matrix].reverse());
}

/**
 * Returns a new rotated version of a block.
 * `block.shape` should be a matrix.
 *
 * @param {object} block
 */
export default function rotateBlock(block) {
    return {
        ...block,
        shape: rotateMatrixClockwise(block.shape),
    };
}
