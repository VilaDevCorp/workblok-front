import React from 'react';
import styled from 'styled-components';
import { Activity, Task } from '../../types/entities';
import { TaskElement } from '../molecule/TaskElement';

export function TaskArea({ tasks, selectedTasks, setSelectedTasks }: {
    tasks: Task[], selectedTasks: string[],
    setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>
}) {
    return (
        <div className={`flex w-full overflow-y-auto bg-background-300 h-full overflow-x-hidden
            items-center flex-col gap-[1px] p-[1px]`}>
            {tasks.map((task) => <TaskElement task={task} selectedActivities={selectedTasks} setSelectedActivities={setSelectedTasks} />)}
        </div>
    )
}