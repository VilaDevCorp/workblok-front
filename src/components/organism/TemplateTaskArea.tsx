import React from 'react';
import { TemplateTask } from '../../types/entities';
import { TemplateTaskElement } from '../molecule/TemplateTaskElement';

export function TemplateTaskArea({ tasks, selectedTasks, setSelectedTasks }: {
    tasks: TemplateTask[], selectedTasks: string[],
    setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>
}) {
    return (
        <div className={`flex w-full overflow-y-auto bg-background-300 h-full overflow-x-hidden
            items-center flex-col gap-[1px] p-[1px]`}>
            {tasks.map((task) => <TemplateTaskElement task={task} selectedActivities={selectedTasks} setSelectedActivities={setSelectedTasks} />)}
        </div>
    )
}