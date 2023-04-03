import moment from 'moment';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import { useMisc } from '../../hooks/useMisc';
import { Task } from '../../types/entities';
import { ActivityOptions } from '../molecule/ActivityOptions';
import { DayElement } from '../molecule/DayElement';

const MainBox = styled.div`
    display:flex;    
    width: 100%;
    position: relative;
    color: ${props => props.theme.color.lightFont};
    flex-direction: column;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const Schedule = styled.div`
    display:flex;    
    flex-direction: row;
    flex-grow: 1;
    overflow:auto;
`

export function WeekPlanner({ startDate }: { startDate: Date }) {

    const { getUserTasks } = useApi()
    const { user, id } = useAuth()
    const [datesArray, setDatesArray] = useState<Date[]>([])
    const [tasks, setTasks] = useState<Task[][]>([])
    const [selectedTasks, setSelectedTasks] = useState<string[]>([])
    const {reloadTasksFlag} = useMisc()

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
        if (id) {
            const weekTasks: Task[][] = [[], [], [], [], [], [], []]
            const tasks = await getUserTasks(id, startDate)
            const startDateMoment = moment(startDate)
            tasks.forEach((task) => {
                const dueMoment = moment(task.dueDate)
                weekTasks[dueMoment.diff(startDateMoment, 'days')].push(task)
            })
            setTasks(weekTasks)
        }
    }

    return (
        <MainBox>
            <Schedule>
                {datesArray.map((date, index) => <DayElement date={date} tasks={tasks[index] ? tasks[index] : []}
                    selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />)}
            </Schedule>
            <ActivityOptions selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
        </MainBox>
    )
}