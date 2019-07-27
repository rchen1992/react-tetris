const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;

function createGrid(height, width) {
    return Array(width).fill(Array(height).fill(null));
}

export default {
    grid: createGrid(GRID_HEIGHT, GRID_WIDTH),
};
