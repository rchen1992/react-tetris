export const MOVEMENT_DIRECTIONS = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
};

export function getCoordinatesAfterMove(direction, coordinates) {
    const [row, col] = coordinates;

    switch (direction) {
        case MOVEMENT_DIRECTIONS.LEFT:
            return [row, col - 1];
        case MOVEMENT_DIRECTIONS.RIGHT:
            return [row, col + 1];
        case MOVEMENT_DIRECTIONS.DOWN:
            return [row + 1, col];
        default:
            // No movement
            return [row, col];
    }
}
