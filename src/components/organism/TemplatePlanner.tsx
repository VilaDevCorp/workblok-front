import { SetStateAction, useEffect, useState } from 'react';
import { useMisc } from '../../hooks/useMisc';
import { TemplateTask } from '../../types/entities';
import { SelectActivityModal } from './SelectActivityModal';
import { TemplateDayElement } from '../molecule/TemplateDayElement';
import { TemplateActivityOptions } from '../molecule/TemplateActivityOptions';
import { TemplateSelectActivityModal } from './TemplateSelectActivityModal';


export function TemplatePlanner({ templateId, tasks, setTasks }: { templateId: string, tasks: TemplateTask[][], setTasks: React.Dispatch<SetStateAction<TemplateTask[][]>> }) {

    const [visibleSelectActivityModal, setVisibleSelectActivityModal] = useState<boolean>(false)
    const [selectedTasks, setSelectedTasks] = useState<string[]>([])
    const { reloadTasksFlag } = useMisc()
    const [selectActivityWeekDay, setSelectActivityWeekDay] = useState<number | undefined>(undefined)


    const onOpenSelectActivityModal = (weekDay: number) => {
        setSelectActivityWeekDay(weekDay)
        setVisibleSelectActivityModal(true)
    }

    const onCloseSelectActivityModal = () => {
        setSelectActivityWeekDay(undefined)
        setVisibleSelectActivityModal(false)
    }

    return (
        <div className='flex w-full min-h-[400px] h-[50vh] max-h-[900px] gap-5 relative text-lightFont-500 flex-col rounded-lg'>
            <div className='flex flex-grow overflow-auto'>
                {[1, 2, 3, 4, 5, 6, 7].map((weekDay) =>
                    <TemplateDayElement weekDay={weekDay} tasks={tasks[weekDay-1]}
                        selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} onCreateTask={() => onOpenSelectActivityModal(weekDay)} />)}
            </div>
            <TemplateActivityOptions selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
            {visibleSelectActivityModal && <TemplateSelectActivityModal templateId={templateId} weekDay={selectActivityWeekDay} onClose={onCloseSelectActivityModal} />}
        </div>
    )
}