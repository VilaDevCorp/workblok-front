import React from 'react';
import styled from 'styled-components';
import { Activity } from '../../types/entities';
import { ActivityIcon } from '../atom/ActivityIcon';
import { stylesVars, ValueGradient } from '../../utils/stylesVars'


export function ActivityElement({ id, activity, selectedActivities, setSelectedActivities }: {
    id: string, activity: Activity, selectedActivities: string[],
    setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>
}) {

    const onSelect = () => {
        if (isSelected) {
            setSelectedActivities((old) => {
                const newValue = old.filter((element) => element !== id)
                return newValue
            }
            )
        } else {
            setSelectedActivities((old) => [id, ...old])
        }
    }

    const isSelected = selectedActivities.includes(id)

    return (
        <div className={`rounded-lg min-h-[50px] h-auto shrink-0 flex gap-4 text-lightFont-500 items-center py-2 px-3 w-full transition-all border border-transparent 
        bg-background-400 cursor-pointer ${isSelected ? 'bg-primary-500 !border-highlight brightness-125' : ''} `} onClick={() => onSelect()}>
            <div className='flex gap-2 w-[60px] justify-end text-lg'>
                <ActivityIcon type={activity.icon} />
                <span className={`border flex w-[25px] h-[25px] justify-center rounded-full items-center px-1 py-1`} style={{ borderColor: stylesVars.taskSize[activity.size as keyof ValueGradient], color: stylesVars.taskSize[activity.size as keyof ValueGradient] }}>{activity.size}</span>
            </div>
            <span className=''>
                {activity.name}
            </span>
        </div>
    )
}