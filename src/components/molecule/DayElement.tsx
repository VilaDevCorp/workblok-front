import moment from 'moment';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { MdAddCircleOutline } from 'react-icons/md'
import { useModal } from '../../hooks/useModal';
import { ModalType } from '../../types/types';
import { ActivityElement } from './ActivityElement';
import { Activity } from '../../types/entities';
import { AddActivityIndicator } from '../atom/AddActivityIndicator';
import { ActivityArea } from '../organism/ActivityArea';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedActivitiesAtom } from '../../recoil/mainAtoms';

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


const AddButton = styled.button`
    height: 4vh;
    width: 20%;
    box-sizing: border-box;
    overflow: hidden;
    background: transparent;
    border: none;
    color: ${props => props.theme.color.lightFont};
    &:hover {
        color: ${props => props.theme.color.highlightColor};
    }
    font-size: ${props => props.theme.fontSize.h2};
    position: sticky;
    align-self: center;
    bottom: 13%;
    opacity: 0;
    transition: opacity .3s;
`;


const MainBox = styled.div`
    display:flex;
    flex-direction: column ;
    width: 100%;
    justify-content: center;
    padding-top: 2vh;
    box-sizing: border-box;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;

    
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
    opacity: .7;
    &:hover {
        opacity: 1;
    }

    &:hover ${AddButton} {
        transition: opacity .3s;
        opacity: 1;
    }

`;

const DateLabel = styled.div`
    display:flex;    
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 10vh;
    z-index: 3;
    font-size: ${props => props.theme.fontSize.title};
    padding-bottom: 2vh;
`;

const DateNumber = styled.span`
    display:flex;    
    width: 100%;
    justify-content: center;
`;



const AddButtonBox = styled.div`
    display: flex;
    justify-content: center;
    padding: 2vh 0%;
    z-index: 3;
`;



export function DayElement({ date, activities }: { date: Date, activities: Activity[] }) {

    const { setModalProps } = useModal()

    const [hoverAddBut, setHoverAddBut] = useState<boolean>(false)
    const setSelectedActivities = useSetRecoilState<string[]>(selectedActivitiesAtom)

    const openModal = () => {
        setSelectedActivities([])
        setModalProps({ visible: true, type: ModalType.SELECT_ACTIVITY })
    }

    return (
        <MainBox>
            <DateLabel>
                {getWeekdayLabel(date)}
                <DateNumber>{date.getDate()}</DateNumber>
            </DateLabel>
            <ActivityArea activities={activities} />
            <AddButtonBox>
                <AddButton onClick={() => openModal()   }>
                    <MdAddCircleOutline />
                </AddButton></AddButtonBox>
        </MainBox>
    )
}