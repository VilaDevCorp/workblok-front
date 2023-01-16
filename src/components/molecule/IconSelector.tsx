import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaRunning } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ValueGradient } from '../../StyledTheme';
import { Activity } from '../../types/entities';
import { ActivityIconTypeEnum } from '../../types/types';
import { ActivityIcon } from '../atom/ActivityIcon';

const MainBox = styled.div`
    display: flex;
    gap: 5%;
    width: 250px;
    height: 40px;
    justify-content: center;
    align-items: center;
`;

interface IconProps {
    isSelected?: boolean
}

const IconOption = styled.div<IconProps>`
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    
    cursor: default;
    font-size: ${props => props.theme.fontSize.h1};
    opacity: ${props => props.isSelected ? 1 : .5};
    border-radius: 60%;
`
export function IconSelector({ icon, setIcon }: {
    icon: ActivityIconTypeEnum | undefined, setIcon: React.Dispatch<React.SetStateAction<ActivityIconTypeEnum | undefined>>
}) {

    return (
        <MainBox>
            {Object.values(ActivityIconTypeEnum).map((iconOption) => <IconOption isSelected={icon === iconOption}
                onClick={() => setIcon(iconOption as ActivityIconTypeEnum)}>
                <ActivityIcon type={iconOption as ActivityIconTypeEnum} />
            </IconOption>
            )}
        </MainBox >
    )
}