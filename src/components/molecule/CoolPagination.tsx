import React, { useState } from 'react';
import styled from 'styled-components';
import { device } from '../../StyledTheme';
import { CoolIconButton } from '../atom/CoolIconButon';
import { IconTypeEnum, SizeEnum } from '../../types/types';

interface PaginationButProps {
    active?: boolean
}

const MainBox = styled.div`
    display: flex;
    padding: 0 25%;
    @media ${device.desktopL} { 
        padding: 0 35%;
        }
    width: 100%;
    box-sizing: border-box;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 5vh;
`;

const NumberBox = styled.div`
    font-size: ${props => props.theme.fontSize.h2};
    color: ${props => props.theme.color.main.n};
`;


export function CoolPagination({ page, setPage, totalPages, isLoading }:
    { page: number, setPage: React.Dispatch<React.SetStateAction<number>>, totalPages: number, isLoading: boolean }) {

    return (
        <MainBox>
            <CoolIconButton type={IconTypeEnum.PREVIOUS} size={SizeEnum.XS} isDark isActive={!isLoading && page > 1} clickFun={page > 1 ? (e) => {
                e.currentTarget.disabled = true;
                ; setPage((old) => old - 1);
            } : undefined} />
            <NumberBox>{page}</NumberBox>
            <CoolIconButton type={IconTypeEnum.NEXT} size={SizeEnum.XS} isDark isActive={!isLoading && page < (totalPages)} clickFun={page < (totalPages) ? () => setPage((old) => old + 1) : undefined} />
        </MainBox>
    )
}