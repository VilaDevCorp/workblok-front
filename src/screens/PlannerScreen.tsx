import { useState } from 'react';
import styled from 'styled-components';
import { ScreenFrame } from '../components/molecule/ScreenFrame';
import { Planner } from '../components/organism/Planner';
import moment from 'moment';


export function PlannerScreen() {
    console.log(moment().get('weekday'))
    const startWeekMoment = moment().get('weekday') > 0 ? moment().set('weekday', 1) : moment().subtract(1, 'week').set('weekday', 1)
    return (
        <ScreenFrame>
            <Planner startDate={moment([startWeekMoment.year(), startWeekMoment.month(), startWeekMoment.date()]).toDate()} />
        </ScreenFrame>
    )
}