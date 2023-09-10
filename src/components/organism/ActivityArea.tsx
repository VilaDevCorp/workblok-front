import React from 'react';
import styled from 'styled-components';
import { Activity } from '../../types/entities';
import { ActivityElement } from '../molecule/ActivityElement';

export function ActivityArea({ activities, selectedActivities, setSelectedActivities }: {
    activities: Activity[], selectedActivities: string[],
    setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>
}) {
    return (
        <>
            {activities.length > 0 ?
                activities.map((activity) => <ActivityElement id={activity.id} activity={activity} selectedActivities={selectedActivities} setSelectedActivities={setSelectedActivities} />)
                :
                <div className='w-full absolute flex justify-center mt-10 items-center text-lightFont-300 text-xl'>{'No elements yet'}</div>
            }
        </>
    )
}