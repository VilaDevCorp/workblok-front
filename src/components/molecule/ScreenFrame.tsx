import React from 'react';
import styled from 'styled-components';


const MainBox = styled.div`
    display:flex;
    flex-direction: column;
    max-width: 1600px;
    height: calc(100vh - 100px);
    margin: auto;
    padding: 4vh 5vw;
    box-sizing: border-box;
    overflow: auto;
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