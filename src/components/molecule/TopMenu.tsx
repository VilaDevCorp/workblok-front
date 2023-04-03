import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


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
    color: ${props => props.theme.color.main.l7};
    font-size: ${props => props.theme.fontSize.title};
    &:hover {
        color: ${props => props.theme.color.main.l5};    
    }
`;

export function TopMenu() {

    const navigate = useNavigate()

    return (
        <MainBox>
            <MenuElement href='#' onClick={()=>navigate('/')}>
                {'Planning'}
            </MenuElement>
            <MenuElement href='#' onClick={()=>navigate('/activities')}>
                {'Activities'}
            </MenuElement>
        </MainBox>
    )
}