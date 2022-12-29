import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Activity } from '../../types/entities';
import { DayElement } from '../molecule/DayElement';

const MainBox = styled.div`
    display:flex;    
    width: 90%;
    color: ${props => props.theme.color.lightFont};
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export function WeekPlanner({ startDate }: { startDate: Date }) {

    const [datesArray, setDatesArray] = useState<Date[]>([])
    const [activities, setActivities] = useState<Activity[][]>([[],[],[],[],[],[],[{id:'2', name:'Running 1/2 hora'}, {id:'3', name:'Boxeo 1 hora'}]])


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
            {datesArray.map((date, index) => <DayElement date={date} activities={activities[index] ? activities[index] : []} />)}
        </MainBox>
    )
}