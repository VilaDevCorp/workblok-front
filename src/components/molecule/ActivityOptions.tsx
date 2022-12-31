import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { selectedActivitiesAtom } from '../../recoil/mainAtoms';
import { IconTypeEnum, SizeEnum } from '../../types/types';
import { CoolIcon } from '../atom/CoolIcon';
import { CoolIconButton } from '../atom/CoolIconButon';

export function ActivityOptions() {

    const [selectedActivities, setSelectedActivities] = useRecoilState<string[]>(selectedActivitiesAtom)
    const {setConfirmationModalProps} = useModal()

    const MainBox = styled.div`
        display: flex;
        position: absolute;
        justify-content: flex-start;
        padding: .5vh 2%;
        align-items: center;
        bottom: -11vh;
        border-radius: 12px;
        width: 20%;
        gap: 5%;
        height: 8vh;
        background-color: transparent;
    `;

    const isActivities:boolean = selectedActivities.length > 0

    const onDeleteActivity = ()=> {
        setConfirmationModalProps({visible:true, params:{body:'¿Desea borrar estas tareas?'}})
    }

    return (
        <MainBox>
            <CoolIconButton isActive={isActivities} size={SizeEnum.S} type={IconTypeEnum.CONFIRM}></CoolIconButton>
            <CoolIconButton isActive={isActivities} size={SizeEnum.S} type={IconTypeEnum.CANCEL}></CoolIconButton>
            <CoolIconButton isActive={isActivities} size={SizeEnum.S} type={IconTypeEnum.DELETE} clickFun={onDeleteActivity}></CoolIconButton>
        </MainBox>
    )
}