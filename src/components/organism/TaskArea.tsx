import React from 'react';
import styled from 'styled-components';
import { Activity, Task } from '../../types/entities';
import { TaskElement } from '../molecule/TaskElement';

const MainBox = styled.div`
    display:flex;    
    width: 100%;
    height: 40vh;
    overflow-y: auto;
    background-color: ${props => props.theme.color.background.l2};
    overflow-x: hidden;
    align-items: center;
    ::-webkit-scrollbar {
        width: 1px;

    }
    /* Track */
    ::-webkit-scrollbar-track {
    background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    width: 0;

    }

    flex-direction: column;
`;

export function TaskArea({ tasks, selectedTasks, setSelectedTasks }: {
    tasks: Task[], selectedTasks: string[],
    setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>
}) {
    return (
        <MainBox>
            {tasks.map((task) => <TaskElement task={task} selectedActivities={selectedTasks} setSelectedActivities={setSelectedTasks} />)}
        </MainBox>
    )
}