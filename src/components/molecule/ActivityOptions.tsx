import React, { useState } from 'react';
import styled from 'styled-components';
import { useApi } from '../../hooks//useApi';
import { useMisc } from '../../hooks//useMisc';
import { useModal } from '../../hooks//useModal';
import { SizeEnum } from '../../types/types';
import { VilaButtonIcon } from '../ui/VilaButtonIcon';

export function ActivityOptions({ selectedTasks, setSelectedTasks }: { selectedTasks: string[], setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>> }) {

    const { setConfirmationModalProps } = useModal()
    const { deleteTask, completeTasks } = useApi()
    const { triggerReloadTasks, triggerReloadUserInfo } = useMisc()

    const isActivities: boolean = selectedTasks ? selectedTasks.length > 0 : false

    const onCompleteTasks = async () => {
        await completeTasks({ taskIds: selectedTasks, isCompleted: true })
        setSelectedTasks([])
        triggerReloadTasks()
        triggerReloadUserInfo()
    }

    const onUncompleteTasks = async () => {
        await completeTasks({ taskIds: selectedTasks, isCompleted: false })
        setSelectedTasks([])
        triggerReloadTasks()
        triggerReloadUserInfo()
    }

    const deleteTasks = async () => {
        await Promise.all(selectedTasks.map(async (task) => {
            await deleteTask(task)
        }))
        setSelectedTasks([])
        triggerReloadTasks()
    }

    const onDeleteActivity = () => {
        setConfirmationModalProps({ visible: true, params: { body: 'Do you really want to delete these tasks?', onConfirm: deleteTasks } })
    }

    return (
        <div className={`flex justify-start items-center rounded-lg w-[200px] gap-2`}>
            <VilaButtonIcon disabled={!isActivities} size={'m'} icon={'confirm'} onClick={onCompleteTasks}></VilaButtonIcon>
            <VilaButtonIcon disabled={!isActivities} size={'m'} icon={'cancel'} onClick={onUncompleteTasks}></VilaButtonIcon>
            <VilaButtonIcon disabled={!isActivities} size={'m'} icon={'delete'} onClick={onDeleteActivity}></VilaButtonIcon>
        </div>
    )
}