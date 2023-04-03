import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { SizeEnum } from '../../types/types';
import { Task } from '../../types/entities';
import { CoolIconButton } from '../atom/CoolIconButon';
import { conf } from './../../conf'
import { TaskArea } from '../organism/TaskArea';
import { ButtonStyleEnum } from '../atom/CoolButton';
import { IconTypeEnum } from '../atom/CoolIcon';
import { ModalType } from '../organism/CoolModal';


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

interface StyleProps {
    hasSelected: boolean
}


const MainBox = styled.div<StyleProps>`
    display:flex;
    flex-direction: column ;
    width: 100%;
    min-width: 150px;
    justify-content: center;
    padding-top: 2vh;
    box-sizing: border-box;
    flex-grow: 1;
    flex-basis: 0;
    background-color: ${props => props.theme.color.background.l1};
    
    
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
    opacity: ${props => props.hasSelected ? 1 : .7};
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



export function DayElement({ date, tasks, selectedTasks, setSelectedTasks }: {
    date: Date, tasks: Task[], selectedTasks: string[],
    setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>
}) {

    const { setModalProps } = useModal()

    const [hoverAddBut, setHoverAddBut] = useState<boolean>(false)

    const hasSelected = tasks.some((task) => selectedTasks.includes(task.id))
    const openModal = () => {
        setSelectedTasks([])
        const dateString = moment(date).format(conf.dateUrlFormat)
        setModalProps({ visible: true, type: ModalType.SELECT_ACTIVITY, params: { date: dateString } })
    }

    return (
        <MainBox hasSelected={hasSelected}>
            <DateLabel>
                {getWeekdayLabel(date)}
                <DateNumber>{date.getDate()}</DateNumber>
            </DateLabel>
            <TaskArea tasks={tasks} selectedTasks={selectedTasks} setSelectedTasks={setSelectedTasks} />
            <AddButtonBox>
                <CoolIconButton style={ButtonStyleEnum.OUTLINED} type={IconTypeEnum.ADD} size={SizeEnum.S} onClick={() => openModal()} />
            </AddButtonBox>
        </MainBox >
    )
}