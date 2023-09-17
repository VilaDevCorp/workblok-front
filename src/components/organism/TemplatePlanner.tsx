import { SetStateAction, useState } from 'react';
import { useMisc } from '../../hooks/useMisc';
import { TemplateTask } from '../../types/entities';
import { TemplateDayElement } from '../molecule/TemplateDayElement';
import { TemplateActivityOptions } from '../molecule/TemplateActivityOptions';
import { TemplateSelectActivityModal } from './TemplateSelectActivityModal';
import { PuffLoader } from 'react-spinners';
import { DescriptionDialog } from '../atom/DescriptionDialog';


export function TemplatePlanner({ templateId, tasks, setTasks, isLoadingPlanner }: { templateId: string, tasks: TemplateTask[][], setTasks: React.Dispatch<SetStateAction<TemplateTask[][]>>, isLoadingPlanner: boolean }) {

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
        <section className='flex w-full h-full max-h-[900px] gap-5 relative text-lightFont-500 flex-col rounded-lg'>
            <div style={{ scrollbarGutter: 'stable' }} className='flex flex-grow overflow-hidden overflow-x-auto h-[45vh] min-h-[350px] bg-background-400 rounded-lg gap-2 '>
                <DescriptionDialog />
                {isLoadingPlanner ?
                    <article className='rounded-lg w-full h-full flex m-auto justify-center items-center'>
                        <PuffLoader color='#124969' loading size={100} />
                    </article>
                    :

                    [1, 2, 3, 4, 5, 6, 7].map((weekDay) =>
                        <TemplateDayElement key={weekDay} weekDay={weekDay} tasks={tasks[weekDay - 1]}
                            selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} onCreateTask={() => onOpenSelectActivityModal(weekDay)} />)

                }
            </div>
            <TemplateActivityOptions selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
            {visibleSelectActivityModal && <TemplateSelectActivityModal templateId={templateId} weekDay={selectActivityWeekDay} onClose={onCloseSelectActivityModal} />}
        </section>
    )
}