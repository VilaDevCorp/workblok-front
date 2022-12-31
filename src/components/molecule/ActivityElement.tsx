import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaRunning } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { selectedActivitiesAtom } from '../../recoil/mainAtoms';

const MainBox = styled.div`
    border-top: 1px solid ${props => props.theme.color.bgColor};
    border-bottom: 1px solid ${props => props.theme.color.bgColor};
    display: flex;
    min-height: 60px;
    height: 13vh;
    color: ${props => props.theme.color.lightFont};
    overflow: hidden;
    align-items: flex-start;
    padding: 2vh 5%;
    width: 100%;
    box-sizing: border-box;
    background-color: ${props => props.theme.color.lightBackground};
    cursor: pointer;

    
    &:hover {
        border-color: ${props => props.theme.color.highlightColor};

    }
    transition: background .3s;
    &.isSelected {
        border-color: ${props => props.theme.color.highlightColor};
        transition: background .3s;
        background-color: ${props => props.theme.color.mainColor};
    }
`;

const ActivityIcon = styled.div`
    font-size: ${props => props.theme.fontSize.title};
    width: 20%;
`

const ActivityName = styled.div`
    font-size: ${props => props.theme.fontSize.regularText};
    width: 80%;
    height: 100%;
    vertical-align: middle;
    overflow-wrap: break-word;
    overflow: hidden;
`

const DeleteIcon = styled.div`
    color: ${props => props.theme.color.danger};
    font-size: ${props => props.theme.fontSize.title};
    vertical-align: middle;

`



export function ActivityElement({ id, name }: { id: string, name: string }) {

    const [selectedActivities, setSelectedActivities] = useRecoilState<string[]>(selectedActivitiesAtom)

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
            <ActivityIcon>
                <FaRunning />
            </ActivityIcon>
            <ActivityName>
                {name}
            </ActivityName>
        </MainBox>
    )
}