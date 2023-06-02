import moment from 'moment';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import { useMisc } from '../../hooks/useMisc';
import { Task } from '../../types/entities';
import { ActivityOptions } from '../molecule/ActivityOptions';
import { DayElement } from '../molecule/DayElement';
import { SelectActivityModal } from './SelectActivityModal';
import { VilaModal } from '../ui/VilaModal';
import { VilaButton } from '../ui/VilaButton';


export function Planner({ startDate }: { startDate: Date }) {

    const { getUserTasks } = useApi()
    const { user } = useAuth()
    const [datesArray, setDatesArray] = useState<Date[]>([])
    const [tasks, setTasks] = useState<Task[][]>([])
    const [visibleSelectActivityModal, setVisibleSelectActivityModal] = useState<boolean>(false)
    const [selectedTasks, setSelectedTasks] = useState<string[]>([])
    const { reloadTasksFlag } = useMisc()
    const [selectActivityDate, setSelectActivityDate] = useState<Date | undefined>(undefined)


    useEffect(() => {
        const startMoment = moment(startDate)

        const newDateArray = []
        for (let i = 0; i < 7; i++) {
            if (i !== 0) {
                startMoment.add(1, 'days')
            }
            newDateArray.push(startMoment.toDate())
        }
        setDatesArray(newDateArray)

        onGetTasks()

    }, [startDate, reloadTasksFlag])

    const onGetTasks = async () => {
        if (user) {
            const weekTasks: Task[][] = [[], [], [], [], [], [], []]
            const tasks = await getUserTasks(user.id, startDate)
            const startDateMoment = moment(startDate)
            tasks.forEach((task) => {
                const dueMoment = moment(task.dueDate)
                weekTasks[dueMoment.diff(startDateMoment, 'days')].push(task)
            })
            setTasks(weekTasks)
        }
    }

    const onOpenSelectActivityModal = (date: Date) => {
        setSelectActivityDate(date)
        setVisibleSelectActivityModal(true)
    }

    const onCloseSelectActivityModal = () => {
        setSelectActivityDate(undefined)
        setVisibleSelectActivityModal(false)
    }

    return (
        <div className='flex w-full h-[75vh] max-h-[900px] gap-5 relative text-lightFont-500 flex-col rounded-lg'>
            <div className='flex flex-grow overflow-hidden'>
                {datesArray.map((date, index) =>
                    <DayElement date={date} tasks={tasks[index] ? tasks[index] : []}
                        selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} onCreateTask={() => onOpenSelectActivityModal(date)} />)}
            </div>
            <ActivityOptions selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
            {visibleSelectActivityModal && <SelectActivityModal date={selectActivityDate} onClose={onCloseSelectActivityModal} />}
        </div>
    )
}