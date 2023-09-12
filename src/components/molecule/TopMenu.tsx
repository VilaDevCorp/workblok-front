import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MenuOption } from '../ui/VilaSidebar';


export function TopMenu({ options }: { options?: MenuOption[] }) {

    const navigate = useNavigate()

    return (
        <nav className='w-1/2 py-2 px-8 h-10 flex gap-8 items-center'>
            {options?.map((option) => (
                <a key={option.label} className='text-lightFont-100 text-xl hover:text-primary-400 cursor-pointer' href='#' onClick={() => navigate(option.route)}>
                    {option.label}
                </a>
            ))}
        </nav>
    )
}