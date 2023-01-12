import React from 'react';
import styled from 'styled-components';
import { Activity } from '../../types/entities';
import { ActivityElement } from '../molecule/ActivityElement';

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

export function ActivityArea({ activities }: { activities: Activity[] }) {

    return (
        <MainBox>
            {activities.map((activity) => <ActivityElement id={activity.id} name={activity.name} />)}
        </MainBox>
    )
}