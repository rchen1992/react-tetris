import { keyframes } from 'styled-components';

export const CLEAR_ROW_ANIMATION_DURATION = 400;

export const clearRowAnimation = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
`;
