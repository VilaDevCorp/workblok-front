import React from 'react';
import { TemplateTask } from '../../types/entities';
import { VilaButtonIcon } from '../ui/VilaButtonIcon';
import { TemplateTaskArea } from '../organism/TemplateTaskArea';


const getWeekdayLabel = (weekDay: number) => {
    switch (weekDay) {
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
        case 0:
            return 'Sunday'
        default:
            return ''
    }
}

export function TemplateDayElement({ weekDay, tasks, selectedTasks, setSelectedTasks, onCreateTask }: {
    weekDay: number, tasks: TemplateTask[], selectedTasks: string[],
    setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>, onCreateTask: () => void
}) {

    const hasSelected = tasks? tasks.some((task) => selectedTasks.includes(task.id)) : false

    return (
        <div className={`flex flex-col w-full min-w-[150px] grow basis-0 [&:last-child]:border-r-0 bg-background-400
            [&:last-child]:rounded-r-lg [&:last-child]:rounded-b-lg [&:first-child]:rounded-tl-lg [&:first-child]:rounded-bl-lg hover:opacity-100 
            ${hasSelected ? 'opacity-100' : 'opacity-70'} } `}>
            <div className={`flex w-full flex-col items-center justify-center h-[80px] z-[3] py-5`}>
                {getWeekdayLabel(weekDay)}
            </div>
            <TemplateTaskArea tasks={tasks} selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
            <div className={`flex justify-center z-[3] py-2`}>
                <VilaButtonIcon style={'outlined'} icon={'add'} size={'s'} onClick={() => onCreateTask()} />
            </div>
        </div >
    )
}