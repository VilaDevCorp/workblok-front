import React from 'react';
import styled from 'styled-components';
import { ValueGradient } from '../../StyledTheme';
import { Activity } from '../../types/entities';
import { ActivityIcon } from '../atom/ActivityIcon';

const MainBox = styled.div`
    border: 1px solid ${props => props.theme.color.background.n};
    border-radius: 12px;
    min-height: 60px;
    display: flex;
    gap: 3%;
    color: ${props => props.theme.color.lightFont};
    overflow: hidden;
    align-items: flex-start;
    padding: 2vh 5%;
    width: 100%;
    box-sizing: border-box;
    background-color: ${props => props.theme.color.background.l2};
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
    width: 20%;
`

const ActivityIconBox = styled.span`
    font-size: ${props => props.theme.fontSize.title};
    height: 3vh;    
    margin-right: 2%;
`

const ActivityName = styled.div`
    font-size: ${props => props.theme.fontSize.regularText};
    width: 80%;
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

export function ActivityElement({ id, activity, selectedActivities, setSelectedActivities }: {
    id: string, activity: Activity, selectedActivities: string[],
    setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>
}) {

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
        <MainBox onClick={() => onSelect()} className={isSelected ? 'isSelected' : ''}>
            <ActivityInfo>
                <ActivityIconBox>
                    <ActivityIcon type={activity.icon} />
                </ActivityIconBox>
                <ActivitySize size={activity.size}>{activity.size}</ActivitySize>
            </ActivityInfo>

            <ActivityName>
                {activity.name}
            </ActivityName>
        </MainBox>
    )
}