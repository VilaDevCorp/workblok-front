import React from 'react';
import styled from 'styled-components';
import { ValueGradient } from '../../StyledTheme';
import { Task } from '../../types/entities';
import { ActivityIcon } from '../atom/ActivityIcon';

interface TaskProps {
    isCompleted?: boolean
}
const MainBox = styled.div<TaskProps>`
    border: 1px solid ${props => props.theme.color.background.l2};
    border-radius: 12px;
    min-height: 60px;
    gap: 3%;
    color: ${props => props.theme.color.lightFont};
    overflow: hidden;
    align-items: flex-start;
    padding: 2vh 5%;
    width: 100%;
    box-sizing: border-box;
    background-color: ${props => props.isCompleted ? props.theme.color.completedGreen : props.theme.color.background.l3};
    cursor: pointer;
    
    &:hover {
        border-color: ${props => props.theme.color.highlightColor};

    }
    transition: background .3s;
    &.isSelected {
        border-color: ${props => props.theme.color.highlightColor};
        transition: background .3s;
        background-color: ${props => props.theme.color.main.n};
    }
`;

const ActivityInfo = styled.div`
display: flex;


`

const ActivityIconBox = styled.span`
    font-size: ${props => props.theme.fontSize.title};
    height: 3vh;    
    margin-right: 2%;
`

const ActivityName = styled.div`
    font-size: ${props => props.theme.fontSize.regularText};
`

interface SizeLabelProps {
    size?: number
}

const ActivitySize = styled.span<SizeLabelProps>`
    border: 1px solid;
    margin-right: 10%;
    margin-bottom: 5%;
    display: flex;
    width: 20px;
    height: 20px;
    font-size: ${props => props.theme.fontSize.h2};
    justify-content: center;
    border-radius: 60px;
    border-color: ${props => props.size ? props.theme.color.taskSize[props.size as keyof ValueGradient] : undefined};
    color: ${props => props.size ? props.theme.color.taskSize[props.size as keyof ValueGradient] : undefined};
`

export function TaskElement({ task, selectedActivities, setSelectedActivities }: {
    task: Task, selectedActivities: string[],
    setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>
}) {

    const onSelect = () => {
        if (isSelected) {
            setSelectedActivities((old) => {
                const newValue = old.filter((element) => element !== task.id)
                return newValue
            }
            )
        } else {
            setSelectedActivities((old) => [task.id, ...old])
        }
    }

    const isSelected = selectedActivities.includes(task.id)

    return (
        <MainBox onClick={() => onSelect()} isCompleted={task.completed} className={isSelected ? 'isSelected' : ''}>
            <ActivityInfo>
                <ActivityIconBox>
                    <ActivityIcon type={task.activity.icon} />
                </ActivityIconBox>
                <ActivitySize size={task.activity.size}>{task.activity.size}</ActivitySize>
            </ActivityInfo>
            <ActivityName>
                {task.activity.name}
            </ActivityName>
        </MainBox>
    )
}