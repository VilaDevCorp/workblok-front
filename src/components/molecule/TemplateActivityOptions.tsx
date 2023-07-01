import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useMisc } from '../../hooks/useMisc';
import { VilaButtonIcon } from '../ui/VilaButtonIcon';
import { ConfirmationModal } from '../organism/ConfirmationModal';

export function TemplateActivityOptions({ selectedTasks, setSelectedTasks }: { selectedTasks: string[], setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>> }) {

    const { deleteTemplateTasks } = useApi()
    const { triggerReloadTasks } = useMisc()
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState<boolean>(false)

    const isActivities: boolean = selectedTasks ? selectedTasks.length > 0 : false

    const onConfirmDeleteTasks = async () => {
        await deleteTemplateTasks(selectedTasks)
        setSelectedTasks([])
        triggerReloadTasks()
    }

    const onDeleteTasks = async () => {
        setConfirmDeleteModalVisible(true)
    }

    return (
        <div className={`flex justify-start items-center rounded-lg w-[200px] gap-2`}>
            <VilaButtonIcon disabled={!isActivities} size={'m'} icon={'delete'} onClick={onDeleteTasks}></VilaButtonIcon>
            <>{confirmDeleteModalVisible && <ConfirmationModal onClick={() => onConfirmDeleteTasks()} onClose={() => setConfirmDeleteModalVisible(false)} label='Do you really want to delete these tasks?' />}</>
        </div>
    )
}