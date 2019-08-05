import { getRandomNewBlock } from './index';

export const NEXT_BLOCK_QUEUE_LENGTH = 1;

export function createNextBlockQueue(length = NEXT_BLOCK_QUEUE_LENGTH) {
    let result = [];
    for (let i = 0; i < length; i++) {
        result.push(getRandomNewBlock());
    }
    return result;
}
