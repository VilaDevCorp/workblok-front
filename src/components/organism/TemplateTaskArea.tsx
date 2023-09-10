import React from 'react';
import { TemplateTask } from '../../types/entities';
import { TemplateTaskElement } from '../molecule/TemplateTaskElement';

export function TemplateTaskArea({ tasks, selectedTasks, setSelectedTasks }: {
    tasks: TemplateTask[], selectedTasks: string[],
    setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>
}) {
    return (
        <div className={`relative no-scrollbar w-full overflow-y-auto overflow-x-hidden`}>
            <div className='w-full fade-out-list flex flex-col gap-[2px]'>
                {tasks.map((task) => <TemplateTaskElement task={task} selectedActivities={selectedTasks} setSelectedActivities={setSelectedTasks} />)}
            </div>
        </div>
    )
}