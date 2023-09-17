import React from 'react';
import styled from 'styled-components';
import { Activity } from '../../types/entities';
import { ActivityIcon } from '../atom/ActivityIcon';
import { stylesVars, ValueGradient } from '../../utils/stylesVars'
import { VilaButtonIcon } from '../ui/VilaButtonIcon';
import { useMisc } from '../../hooks/useMisc';
import { useDescriptionDialog } from '../../hooks/useDescriptionDialog';
import { VilaIcon } from '../ui/VilaIcon';


export function ActivityElement({ id, activity, selectedActivities, setSelectedActivities }: {
    id: string, activity: Activity, selectedActivities: string[],
    setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>
}) {

    const { onShowDescriptionDialog, onHideDescriptionDialog } = useDescriptionDialog()
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
        <div className={`rounded-lg min-h-[50px] h-auto shrink-0 flex gap-4 opacity-80 hover:!opacity-100 text-lightFont-500 items-center py-2 px-3 w-full transition-all border border-transparent 
        bg-background-400 cursor-pointer ${isSelected ? ' !opacity-100 !border-highlight brightness-125 ' : ''} `} onClick={() => onSelect()}>
            <div className='flex flex-col gap-2 items-center text-2xl'>
                <ActivityIcon type={activity.icon} />
                <span className={` flex w-[25px] h-[25px] text-lg justify-center border-2 font-bold rounded-full items-center px-1 py-1`} style={{ borderColor: stylesVars.taskSize[activity.size as keyof ValueGradient], color: stylesVars.taskSize[activity.size as keyof ValueGradient] }}>{activity.size}</span>
                {activity.description !== undefined &&
                    <span className='text-2xl'>
                        <VilaIcon type={'notes'} onClick={(e) => { onShowDescriptionDialog(activity.description, true, e); e.stopPropagation() }}
                            onMouseEnter={(e) => { onShowDescriptionDialog(activity.description, true, e); e.stopPropagation() }}
                            onMouseLeave={(e) => { onHideDescriptionDialog(); e.stopPropagation() }} />
                    </span>}


            </div>
            <span style={{ overflowWrap: 'anywhere' }}>
                {activity.name}
            </span>
        </div>
    )
}