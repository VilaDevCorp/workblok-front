import { useState } from 'react';
import styled from 'styled-components';
import { ScreenFrame } from '../components/molecule/ScreenFrame';
import { WeekPlanner } from '../components/organism/WeekPlanner';


const MainBox = styled.div`
    display: flex;
    gap: 5vh;
    margin-left: 10%;
    margin-top: 5vh;
    justify-content: center;
    flex-direction: column;
`;



export function Planning() {

    return (
        <ScreenFrame>
            <WeekPlanner startDate={new Date(2022, 11, 26)} />
        </ScreenFrame>
    )
}
