import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


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
            <a className='text-lightFont-100 text-xl hover:text-primary-400 cursor-pointer' onClick={() => navigate('/templates')}>
                {'Templates'}
            </a>
        </div>
    )
}