import React, { useState } from 'react';
import styled from 'styled-components';
import { SizeEnum } from '../../types/types';
import { IconTypeEnum } from '../atom/CoolIcon';
import { CoolIconButton } from '../atom/CoolIconButon';

interface PaginationButProps {
    active?: boolean
}

const MainBox = styled.div`
    display: flex;
    width: 250px;
    align-self: center;
    box-sizing: border-box;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 4vh;
`;

const NumberBox = styled.div`
    font-size: ${props => props.theme.fontSize.h2};
    color: ${props => props.theme.color.main.l5};
`;


export function CoolPagination({ page, setPage, totalPages, isLoading }:
    { page: number, setPage: React.Dispatch<React.SetStateAction<number>>, totalPages: number, isLoading?: boolean }) {

    return (
        <MainBox>
            <CoolIconButton type={IconTypeEnum.PREVIOUS} size={SizeEnum.XS} disabled={isLoading || page <= 0} onClick={page > 0 ? (e) => {
                e.currentTarget.disabled = true;
                ; setPage((old) => old - 1);
            } : undefined} />
            <NumberBox>{page + 1}</NumberBox>
            <CoolIconButton type={IconTypeEnum.NEXT} size={SizeEnum.XS} disabled={isLoading || page >= (totalPages - 1)} onClick={page < (totalPages - 1) ? () => setPage((old) => old + 1) : undefined} />
        </MainBox>
    )
}