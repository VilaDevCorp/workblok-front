import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaRunning } from 'react-icons/fa';
import { MdAddCircleOutline } from 'react-icons/md';
import styled from 'styled-components';

const MainBox = styled.div`
    display: flex;
    height: 100%;
    padding: 2vh 5%;
    justify-content: center;
    box-sizing: border-box;
    &:hover {
        border-color: ${props => props.theme.color.highlightColor};

    }
`;
const ActivityIcon = styled.span`
    font-size: ${props => props.theme.fontSize.title};
    margin-right: 5%;
    vertical-align: middle;
`
export function AddActivityIndicator() {

    return (
        <MainBox>
            <ActivityIcon>
                <MdAddCircleOutline/>
            </ActivityIcon>
            {'Add activity'}
        </MainBox>
    )
}