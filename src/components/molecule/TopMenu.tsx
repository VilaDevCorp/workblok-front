import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


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
        <div className='w-1/2 py-2 px-8 h-10 flex gap-8 items-center'>
            <a className='text-lightFont-100 text-xl hover:text-primary-400 cursor-pointer' href='#' onClick={() => navigate('/')}>
                {'Planning'}
            </a>
            <a className='text-lightFont-100 text-xl hover:text-primary-400 cursor-pointer' onClick={() => navigate('/activities')}>
                {'Activities'}
            </a>
        </div>
    )
}