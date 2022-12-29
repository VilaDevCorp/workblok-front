import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaRunning } from 'react-icons/fa';
import styled from 'styled-components';

const MainBox = styled.div`
    border-top: 1px solid ${props => props.theme.color.bgColor};
    border-bottom: 1px solid ${props => props.theme.color.bgColor};
    display: flex;
    min-height: 5vh;
    padding: 2vh 5%;
    &:hover {
        border-color: ${props => props.theme.color.highlightColor};

    }
`;
const ActivityIcon = styled.span`
    font-size: ${props => props.theme.fontSize.title};
    margin-right: 5%;
    vertical-align: middle;
`

const DeleteIcon = styled.div`
    color: ${props => props.theme.color.danger};
    font-size: ${props => props.theme.fontSize.title};
    vertical-align: middle;

`



export function ActivityElement({ name }: { name: string }) {

    return (
        <MainBox>
            <ActivityIcon>
                <FaRunning />
            </ActivityIcon>
            {name}
            <DeleteIcon>
                <AiFillDelete />
            </DeleteIcon>
        </MainBox>
    )
}