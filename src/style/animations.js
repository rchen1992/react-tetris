import { keyframes } from 'styled-components';
import { math } from 'polished';

export const CLEAR_ROW_ANIMATION_DURATION = 300;
export const COLLAPSE_ROW_ANIMATION_DURATION = 300;

/**
 * Amount of time that row animations should overlap.
 */
export const ROW_ANIMATION_DURATION_OVERLAP = 100;

export const clearRowAnimation = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
`;

export const collapseRowAnimation = props => keyframes`
    from {
        transform: none;
    }
    
    to {
        transform: ${`translateY(${math(
            `${props.theme.cellSize} * ${props.animatingCollapseRows}`
        )})`};
    }
`;
