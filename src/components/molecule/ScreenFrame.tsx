import React from 'react';
import styled from 'styled-components';


const MainBox = styled.div`
    display:flex;
    flex-direction: column;
    padding: 1% 2%;
    height:90vh;
    box-sizing: border-box;
`;
const Title = styled.h1`
    font-size: ${props => props.theme.fontSize.h1};
    color: ${props => props.theme.color.main.n};
`;



export function ScreenFrame({ title, children }: { title?: string, children: JSX.Element| JSX.Element[] }) {

    return (
        <MainBox>
            {title ?
                <Title>{title}</Title>
                : undefined}
            {children}
        </MainBox>
    )
}