import React from 'react';
import styled from 'styled-components';
import { Activity, Task } from '../../types/entities';
import { ActivityElement, TaskElement } from '../molecule/TaskElement';

const MainBox = styled.div`
    display:flex;    
    width: 100%;
    height: 40vh;
    overflow-y: auto;
    background-color: ${props => props.theme.color.background.l1};
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

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }

    flex-direction: column;
`;

export function TaskArea({ tasks, selectedTasks, setSelectedTasks }: {
    tasks: Task[], selectedTasks: string[],
    setSelectedTasks: React.Dispatch<React.SetStateAction<string[]>>
}) {
    return (
        <MainBox>
            {tasks.map((task) => <TaskElement id={task.id} activity={task.activity} selectedActivities={selectedTasks} setSelectedActivities={setSelectedTasks} />)}
        </MainBox>
    )
}