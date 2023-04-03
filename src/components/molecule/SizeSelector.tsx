import React from 'react';
import styled from 'styled-components';
import { ValueGradient } from '../../StyledTheme';

const MainBox = styled.div`
    display: flex;
    gap: 5%;
    width: 250px;
    height: 40px;
    justify-content: center;
    align-items: center;
`;

interface SizeProps {
    size?: number
    isSelected?: boolean
}

const SizeOption = styled.div<SizeProps>`
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    cursor: default;
    font-size: ${props => props.theme.fontSize.h2};
    opacity: ${props => props.isSelected ? 1 : .5};
    border-radius: 60%;
    border: 1px solid ${props => props.size ? props.theme.color.taskSize[props.size as keyof ValueGradient] : undefined};
    color: ${props => props.size ? props.theme.color.taskSize[props.size as keyof ValueGradient] : undefined};
`

const sizeOptions: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
]

export function SizeSelector({ size, setSize }: {
    size: string, setSize: React.Dispatch<React.SetStateAction<string>>
}) {

    return (
        <MainBox>
            {sizeOptions.map((sizeOption) => <SizeOption size={Number.parseInt(sizeOption)} isSelected={size === sizeOption} onClick={() => setSize(sizeOption)}>{sizeOption}</SizeOption>
            )}
        </MainBox >
    )
}