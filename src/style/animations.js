import { keyframes } from 'styled-components';
import { math } from 'polished';

export const CLEAR_ROW_ANIMATION_DURATION = 300;
export const COLLAPSE_ROW_ANIMATION_DURATION = 300;

/**
 * Amount of time that row animations should overlap.
 */
export const ROW_ANIMATION_DURATION_OVERLAP = 100;

/**
 * Title animation constants.
 */
export const TITLE_POSITION_ANIMATION_DURATION = 300;
export const TITLE_POSITION_ANIMATION_DELAY = 2000;
export const TITLE_LETTER_ANIMATION_DELAY_CHANGE = 25;
export const TITLE_LETTER_ANIMATION_DURATION_CHANGE = 150;

/**
 * Amount of time that the grid and title animations should overlap each other.
 */
export const GRID_AND_TITLE_ANIMATION_OVERLAP = 100;

/**
 * Grid animation constants.
 * The delay accounts for the title animation in the beginning.
 */
export const GRID_ANIMATION_DURATION = 500;
export const GRID_ANIMATION_DELAY =
    TITLE_POSITION_ANIMATION_DURATION +
    TITLE_POSITION_ANIMATION_DELAY -
    GRID_AND_TITLE_ANIMATION_OVERLAP;

export const fadeOut = keyframes`
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

export const gridContainerAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const horizontalFadeSlide = keyframes`
    from {
        opacity: 0;
        transform: translateX(-10px);
    }
    
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const titlePositionAnimation = keyframes`
    from {
        transform: translate(0, 0) scale(1);
    }
    
    to {
        transform: translate(-42%, -45%) scale(0.35);
    }
`;
