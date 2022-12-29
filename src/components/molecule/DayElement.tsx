import moment from 'moment';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { MdAddCircleOutline } from 'react-icons/md'
import { useModal } from '../../hooks/useModal';
import { ModalType } from '../../types/types';
import { ActivityElement } from './ActivityElement';
import { Activity } from '../../types/entities';
import { AddActivityButton } from '../atom/AddActivityButton';

const getWeekdayLabel = (date: Date) => {
    const weekDayNumber = moment(date).get('weekday')

    switch (weekDayNumber) {
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
        case 0:
            return 'Sunday'
        default:
            return ''
    }
}

const AddIcon = styled.div`
    height: 0vh;
    box-sizing: border-box;
    overflow: hidden;
`;

const showAddIcon = keyframes`
  0%   {& {height:0vh;}}
  100%   {&{height:8vh;}}
`

const hideAddIcon = keyframes`
  0%   {& {height:8vh;}}
  100%   {&{height:0vh;}}
`

const MainBox = styled.div`
    display:flex;
    flex-direction: column ;
    width: 100%;
    justify-content: center;
    padding-top: 2vh;
    box-sizing: border-box;
    border-right: 1px solid ${props => props.theme.color.bgColor};
    
    &:last-child {
        border-right: none;        
    }
    &:last-child {
        border-top-right-radius: 12px;        
        border-bottom-right-radius: 12px;        
    }
    &:first-child {
        border-top-left-radius: 12px;        
        border-bottom-left-radius: 12px;        
    }
    background-color: ${props => props.theme.color.lightBackground};
    opacity: .5;
    &:hover {
        opacity: 1;
    }
    &:hover ${AddIcon} {
        animation: ${showAddIcon} .5s;
        height: 8vh;
    }
    &:not(:hover) ${AddIcon} {
        animation: ${hideAddIcon} .2s;
        height: 0vh;
    }
`;

const DateLabel = styled.div`
    display:flex;    
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 10vh;
    font-size: ${props => props.theme.fontSize.title};
    margin-bottom: 2vh;
`;

const DateNumber = styled.span`
    display:flex;    
    width: 100%;
    justify-content: center;
`;



const ActivityArea = styled.div`
    display:flex;    
    width: 100%;
    height: 40vh;
    flex-direction: column;
`;

  
export function DayElement({ date, activities }: { date: Date, activities: Activity[]}) {

    const {setModalProps} = useModal()



    return (
        <MainBox onClick={()=>setModalProps({visible:true,type: ModalType.SELECT_ACTIVITY})}>
            <DateLabel>
                {getWeekdayLabel(date)}
                <DateNumber>{date.getDate()}</DateNumber>
            </DateLabel>
            <ActivityArea>
                <AddIcon >
                    <AddActivityButton/>
                </AddIcon>
                {activities.map((activity)=> <ActivityElement name={activity.name}/>)}
            </ActivityArea>
        </MainBox>
    )
}