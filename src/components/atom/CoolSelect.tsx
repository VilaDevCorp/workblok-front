import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { SelectOption, SizeEnum } from '../../types/types';
import { SelectBase } from './../bases/SelectBase';
import { device } from '../../StyledTheme';


interface SizeProps {
    width: number //UNIT: px
    height: number //UNIT: px
    fontSize: string
}

interface AllProps extends SizeProps {
    isDark?: boolean
}


const CoolStyledSelect = styled(SelectBase) <AllProps>`
    padding: 5px;
    font-size: ${props => props.fontSize};
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};
    background: ${props => props.theme.color.main.n};
    color: ${props => props.theme.color.lightFont};
    border: none;
    transition: background .2s;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    border: 1px solid transparent;
    border-radius: 12px;
    outline:none;
    @media ${device.desktopL} { 
        width: ${props => `${1.2 * props.width}px`};
        height: ${props => `${1.2 * props.height}px`};
    }
    & svg {
        font-size: 2rem;
        width: 20%;
        margin-right: 5%;
        box-sizing: border-box;
    }
    & div {
        overflow: hidden;

        width: 80%;
    }
    &:focus {
        border: 1px solid ${props => props.theme.color.highlightColor};
        transition: border .2s;
    }
    &:hover {
        transition: background .2s;
        background: ${props => props.theme.color.main.l1};
    }    
`;


export function CoolSelect({ id, options, value, setValue, size }: {
    id: string, options: SelectOption[], value: string, setValue: (value: any) => void, size?: SizeEnum
}) {

    const getSize = (): SizeProps => {
        switch (size) {
            case SizeEnum.L:
                return { width: 300, height: 40, fontSize: '1rem' }
            case SizeEnum.M:
                return { width: 250, height: 40, fontSize: '1rem' }
            case SizeEnum.S:
                return { width: 200, height: 40, fontSize: '1rem' }
            case SizeEnum.XS:
                return { width: 100, height: 40, fontSize: '1rem' }
            default:
                return { width: 250, height: 40, fontSize: '1rem' }
        }
    }

    const sizeInfo = getSize()

    return (
        <CoolStyledSelect height={sizeInfo.height} width={sizeInfo.width} fontSize={sizeInfo.fontSize} options={options} setValue={setValue} value={value}/>
    )
}