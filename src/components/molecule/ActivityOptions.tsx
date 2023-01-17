import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useApi } from '../../hooks/useApi';
import { useModal } from '../../hooks/useModal';
import { reloadTasksAtom } from '../../recoil/mainAtoms';
import { IconTypeEnum, SizeEnum } from '../../types/types';
import { CoolIcon } from '../atom/CoolIcon';
import { CoolIconButton } from '../atom/CoolIconButon';

export function ActivityOptions({ selectedTasks, setSelectedTasks }: { selectedTasks: string[], setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>> }) {

    const { setConfirmationModalProps } = useModal()
    const { updateTask, deleteTask } = useApi()
    const setReloadTasks = useSetRecoilState(reloadTasksAtom)

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

    const onCompleteTasks = async () => {
        await Promise.all(selectedTasks.map(async (task) => {
            await updateTask({ id: task, completed: true })
        }))
        setSelectedTasks([])
        setReloadTasks((old)=>!old)
    }

    const onUncompleteTasks = async () => {
        await Promise.all(selectedTasks.map(async (task) => {
            await updateTask({ id: task, completed: false })
        }))
        setSelectedTasks([])
        setReloadTasks((old)=>!old)
    }

    const deleteTasks = async () => {
        await Promise.all(selectedTasks.map(async (task) => {
            await deleteTask(task)
        }))
        setSelectedTasks([])
        setReloadTasks((old)=>!old)
    }

    const onDeleteActivity = () => {
        setConfirmationModalProps({ visible: true, params: { body: 'Do you really want to delete these tasks?', onConfirm: deleteTasks } })
    }

    return (
        <MainBox>
            <CoolIconButton isActive={isActivities} size={SizeEnum.S} type={IconTypeEnum.CONFIRM} clickFun={onCompleteTasks}></CoolIconButton>
            <CoolIconButton isActive={isActivities} size={SizeEnum.S} type={IconTypeEnum.CANCEL}clickFun={onUncompleteTasks}></CoolIconButton>
            <CoolIconButton isActive={isActivities} size={SizeEnum.S} type={IconTypeEnum.DELETE} clickFun={onDeleteActivity}></CoolIconButton>
        </MainBox>
    )
}