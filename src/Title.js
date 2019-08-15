import React from 'react';
import styled from 'styled-components';
import { horizontalFadeSlide, titlePositionAnimation } from 'style/animations';
import {
    TITLE_POSITION_ANIMATION_DURATION,
    TITLE_POSITION_ANIMATION_DELAY,
    TITLE_LETTER_ANIMATION_DELAY_CHANGE,
    TITLE_LETTER_ANIMATION_DURATION_CHANGE,
} from 'style/animations';

const TITLE_LETTERS = ['R', 'e', 'a', 'c', 't', '', 'T', 'e', 't', 'r', 'i', 's'];

const StyledTitle = styled.span`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    animation: ${titlePositionAnimation} ${TITLE_POSITION_ANIMATION_DURATION}ms;
    animation-delay: ${TITLE_POSITION_ANIMATION_DELAY}ms;
    animation-fill-mode: forwards;
`;

const TitleLetter = styled.span`
    animation: ${horizontalFadeSlide} ${props => props.duration}ms;
    animation-delay: ${props => props.delay}ms;
    animation-fill-mode: forwards;
    width: ${props => (props.isSpace ? '6px' : 'initial')};
    font-size: 60px;
    opacity: 0;
`;

const titleLetters = TITLE_LETTERS.map((letter, index) => (
    <TitleLetter
        key={index}
        delay={index * TITLE_LETTER_ANIMATION_DELAY_CHANGE}
        duration={(index + 1) * TITLE_LETTER_ANIMATION_DURATION_CHANGE}
        isSpace={letter === ''}
    >
        {letter}
    </TitleLetter>
));

function Title() {
    return <StyledTitle>{titleLetters}</StyledTitle>;
}

export default Title;
