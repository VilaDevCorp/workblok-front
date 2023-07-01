import React, { useState } from 'react';
import { useApi } from '../../hooks//useApi';
import { useMisc } from '../../hooks//useMisc';
import { VilaButtonIcon } from '../ui/VilaButtonIcon';
import { ConfirmationModal } from '../organism/ConfirmationModal';

export function ActivityOptions({ selectedTasks, setSelectedTasks }: { selectedTasks: string[], setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>> }) {

    const { deleteTasks, completeTasks } = useApi()
    const { triggerReloadTasks, triggerReloadUserInfo } = useMisc()
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState<boolean>(false)

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

    const onConfirmDeleteTasks = async () => {
        await deleteTasks(selectedTasks)
        setSelectedTasks([])
        triggerReloadTasks()
    }

    const onDeleteTasks = async ()=> {
        setConfirmDeleteModalVisible(true)
    }

    return (
        <div className={`flex justify-start items-center rounded-lg w-[200px] gap-2`}>
            <VilaButtonIcon disabled={!isActivities} size={'m'} icon={'confirm'} onClick={onCompleteTasks}></VilaButtonIcon>
            <VilaButtonIcon disabled={!isActivities} size={'m'} icon={'cancel'} onClick={onUncompleteTasks}></VilaButtonIcon>
            <VilaButtonIcon disabled={!isActivities} size={'m'} icon={'delete'} onClick={onDeleteTasks}></VilaButtonIcon>
            <>{confirmDeleteModalVisible && <ConfirmationModal onClick={() => onConfirmDeleteTasks()} onClose={() => setConfirmDeleteModalVisible(false)} label='Do you really want to delete these tasks?' />}</>
        </div>
    )
}