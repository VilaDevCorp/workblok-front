import React from 'react';
import styled from 'styled-components';
import { Task } from '../../types/entities';
import { ActivityIcon } from '../atom/ActivityIcon';
import { ValueGradient, stylesVars } from './../../utils/stylesVars'


// const ActivityInfo = styled.div`
// display: flex;


// `



export function TaskElement({ task, selectedActivities, setSelectedActivities }: {
    task: Task, selectedActivities: string[],
    setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>
}) {

    const onSelect = () => {
        if (isSelected) {
            setSelectedActivities((old) => {
                const newValue = old.filter((element) => element !== task.id)
                return newValue
            }
            )
        } else {
            setSelectedActivities((old) => [task.id, ...old])
        }
    }

    const isSelected = selectedActivities.includes(task.id)
    return (
        <div className={`border rounded-lg border-primary-900 bg-primary-400 opacity-80 min-h-[60px] overflow-hidden 
            cursor-pointer w-full flex items-center gap-2 px-2 py-1  ${task.completed ? ' !bg-success ' : ''}
            ${isSelected ? ' !opacity-100 border-background-100' : ''} hover:!opacity-100 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] `} onClick={() => onSelect()} >
            <div className='flex flex-col gap-2'>
                {task.edges.activity.icon !== undefined &&
                    <span className='text-lg'>
                        <ActivityIcon type={task.edges.activity.icon} />
                    </span>}
                <span className={`border flex w-[20px] h-[20px] items-center justify-center rounded-full`} style={{
                    borderColor: stylesVars.taskSize[task.edges.activity.size as keyof ValueGradient],
                    color: stylesVars.taskSize[task.edges.activity.size as keyof ValueGradient]
                }}>{task.edges.activity.size}</span>
            </div>
            <div>
                {task.edges.activity.name}
            </div>
        </div>
    )
}