import React from 'react';
import styled from 'styled-components';
import { Activity, Task } from '../../types/entities';
import { TaskElement } from '../molecule/TaskElement';

export function TaskArea({ tasks, selectedTasks, setSelectedTasks }: {
    tasks: Task[], selectedTasks: string[],
    setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>
}) {
    return (
        <div className={`relative no-scrollbar w-full overflow-y-auto overflow-x-hidden`}>
            <div className='w-full fade-out-list flex flex-col gap-[2px]'>
                {tasks.map((task) => <TaskElement key={task.id} task={task} selectedActivities={selectedTasks} setSelectedActivities={setSelectedTasks} />)}
            </div>
        </div>
    )
}