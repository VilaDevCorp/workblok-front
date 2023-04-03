import React from 'react';
import styled from 'styled-components';
import { SizeEnum } from '../../types/types';
import { CheckboxBase } from '../bases/CheckboxBase';
import { CoolIcon, IconTypeEnum } from './CoolIcon';


interface MainSizeProps {
    totalWidth?: string
}

interface SizeProps {
    width: number //UNIT: px
}

interface AllProps extends SizeProps {
    children?: JSX.Element | JSX.Element[]
    disabled?: boolean
}

const MainBox = styled.div<MainSizeProps>`
    display: flex;
    align-items: center;
    height: 46px;
    min-height: 46px;
    width: ${props => `${props.totalWidth ? props.totalWidth : undefined}`};
`;

const HiddenCheckbox = styled(CheckboxBase)`
    display: none;
`

const CustomCheckbox = styled.div<AllProps>`
    position: relative;
    border-radius: 12px;
    width: ${props => `${props.width}px`};
    height: ${props => `${props.width}px`};
    transition: background .2s;
    border: 2px solid ${props => props.theme.color.main.l3};

    display: flex;
    align-items: center;
    &:hover {
        border: ${props => props.disabled ? undefined : `2px solid ${props.theme.color.main.d1}`};
    }
    
    &:focus {
        border: 2px solid ${props => props.theme.color.main.n} !important;
        transition: border .2s;
    }  
`

const CoolStyledCheckbox = styled.div<AllProps>`
    padding: 5px;
    font-size: ${props => props.theme.fontSize.regularText}; 
    width: ${props => `${props.width}px`};
    height: ${props => `${props.width}px`};
    transition: border .2s;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid transparent;
    background-color: ${props => props.disabled ? props.theme.color.main.lowOp : undefined};
    border-radius: 50%;
    outline:none;
    & div {
        overflow: hidden;

        width: 80%;
    }
`;

const CoolStyledCheck = styled.div<AllProps>`
    z-index: 3;
    position: absolute;
    display: flex;
    width: 100%;    
    justify-content: center;
    padding: 0;
    margin:0;
    align-items: center;
    & svg {
        font-size: 1rem;
        width: 100%;
        height: 100%;
        color: ${props => props.theme.color.main.n};
        box-sizing: border-box;
    }
`

const CoolStyledLabel = styled.label<AllProps>`
    margin-left: 10px;
    color: ${props => props.theme.color.main.d7};
    opacity: ${props => props.disabled ? .6 : undefined};
`



const getSize = (size?: SizeEnum): SizeProps => {
    switch (size) {
        case SizeEnum.L:
            return { width: 20 }
        case SizeEnum.M:
            return { width: 20 }
        case SizeEnum.S:
            return { width: 20 }
        case SizeEnum.XS:
            return { width: 15 }
        default:
            return { width: 15 }
    }
}

export function CoolCheckbox({ id, value, setValue, size, label, children, disabled }: {
    id?: string, value: boolean, setValue: React.Dispatch<React.SetStateAction<boolean>>, size?: SizeEnum, label?: string,
    children?: JSX.Element | JSX.Element[], disabled?: boolean
}) {

    const sizeInfo = getSize(size)

    const onClick = () => {
        if (!disabled) {
            setValue((old) => !old)
        }
    }

    return (
        <MainBox onClick={onClick}>
            <HiddenCheckbox setValue={setValue} value={value} />
            <CustomCheckbox width={sizeInfo.width} disabled={disabled}>
                <CoolStyledCheckbox width={sizeInfo.width} disabled={disabled} />
                {value ? <CoolStyledCheck width={sizeInfo.width}>
                    <CoolIcon type={IconTypeEnum.CHECK} />
                </CoolStyledCheck>
                    : <></>}
            </CustomCheckbox>
            {label ? <CoolStyledLabel width={sizeInfo.width} disabled={disabled} >{<>{label}</>}</CoolStyledLabel>
                :
                <CoolStyledLabel width={sizeInfo.width} >{children}</CoolStyledLabel>
            }
        </MainBox>
    )
}