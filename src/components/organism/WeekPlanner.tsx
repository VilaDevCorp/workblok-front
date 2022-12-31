import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Activity } from '../../types/entities';
import { ActivityOptions } from '../molecule/ActivityOptions';
import { DayElement } from '../molecule/DayElement';

const MainBox = styled.div`
    display:flex;    
    width: 90%;
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
    width: 100%;
    flex-shrink: 1;
    flex-basis: 0;

`

export function WeekPlanner({ startDate }: { startDate: Date }) {

    const [datesArray, setDatesArray] = useState<Date[]>([])
    const [activities, setActivities] = useState<Activity[][]>([[], [], [], [], [], [{ id: '1', name: 'Running 1/2 hora hasta que nos cansemos mucho pero sin dar más de mi hasta cierto punto' }], [{ id: '2', name: 'Running 1/2 hora' }, { id: '3', name: 'Boxeo 1 hora' },
    { id: '4', name: 'Running 1 hora' }, { id: '5', name: 'Movilidad 1/2 hora' }, { id: '6', name: 'Movilidad 1/2 hora' }, { id: '7', name: 'Movilidad 1/2 hora' }]])
    const [selectedActivities, setSelectedActivities] = useState<String[]>([])

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

    }, [startDate])

    return (
        <MainBox>
            <Schedule>
                {datesArray.map((date, index) => <DayElement date={date} activities={activities[index] ? activities[index] : []} />)}
            </Schedule>
            <ActivityOptions />
        </MainBox>
    )
}