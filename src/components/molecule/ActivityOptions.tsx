import React, { useState } from 'react';
import styled from 'styled-components';
import { useApi } from '../../hooks/useApi';
import { useModal } from '../../hooks/useModal';
import { IconTypeEnum, SizeEnum } from '../../types/types';
import { CoolIcon } from '../atom/CoolIcon';
import { CoolIconButton } from '../atom/CoolIconButon';

export function ActivityOptions({ selectedTasks, setSelectedTasks }: { selectedTasks: string[], setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>> }) {

    const { setConfirmationModalProps } = useModal()
    const {deleteTask} = useApi()

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

    const isActivities: boolean = selectedTasks ? selectedTasks.length > 0 : false

    const deleteTasks = async()=> {
        await Promise.all(selectedTasks.map(async (task) => {
            await deleteTask(task)
        }))
        setSelectedTasks([])
    }

    const onDeleteActivity = () => {
        setConfirmationModalProps({ visible: true, params: { body: 'Do you really want to delete these tasks?', onConfirm: deleteTasks } })
    }

    return (
        <MainBox>
            <CoolIconButton isActive={isActivities} size={SizeEnum.S} type={IconTypeEnum.CONFIRM}></CoolIconButton>
            <CoolIconButton isActive={isActivities} size={SizeEnum.S} type={IconTypeEnum.CANCEL}></CoolIconButton>
            <CoolIconButton isActive={isActivities} size={SizeEnum.S} type={IconTypeEnum.DELETE} clickFun={onDeleteActivity}></CoolIconButton>
        </MainBox>
    )
}