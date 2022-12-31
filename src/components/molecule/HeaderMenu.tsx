import React from 'react';
import styled from 'styled-components';

const MainBox = styled.div`
    width: 50%;
    padding: 1vh 5%;
    height: 10vh;
    display: flex;
    gap: 10%;
    align-items: center;
`;

const MenuElement = styled.a`
    text-decoration: none;
    color: ${props => props.theme.color.lightFont};
    font-size: ${props => props.theme.fontSize.title};
    &:hover {
        color: ${props => props.theme.color.mainColor};    
    }
`;

export function HeaderMenu() {

    return (
        <MainBox>
            <MenuElement href='#'>
                {'Planning'}
            </MenuElement>
            <MenuElement href='#'>
                {'Activities'}
            </MenuElement>
        </MainBox>
    )
}