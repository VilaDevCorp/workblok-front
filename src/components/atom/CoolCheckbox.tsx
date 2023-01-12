import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { SelectOption, SizeEnum } from '../../types/types';
import { SelectBase } from '../bases/SelectBase';
import { device } from '../../StyledTheme';
import { TextInputBase } from '../bases/TextInputBase';
import { CheckboxBase } from '../bases/CheckboxBase';
import { BsCheck } from 'react-icons/bs';


interface MainSizeProps {
    totalWidth?: string
}

interface SizeProps {
    width: number //UNIT: px
    fontSize: string
}

interface AllProps extends SizeProps {
    isDark?: boolean
    children?: JSX.Element | JSX.Element[]
}

const MainBox = styled.div<MainSizeProps>`
    display: flex;
    width: ${props => `${props.totalWidth ? props.totalWidth : undefined}`};
`;

const HiddenCheckbox = styled(CheckboxBase)`
    display: none;
`

const CustomCheckbox = styled.div<AllProps>`
    position: relative;
    width: ${props => `${props.width}px`};
    transition: background .2s;
    display: flex;
    align-items: center;
    
    &:hover {
        transition: background .2s;
        background-color: ${props => props.theme.color.hoverInputLight} ;
    }
`

const CoolStyledCheckbox = styled.div<AllProps>`
    padding: 5px;
    font-size: ${props => props.fontSize};
    width: ${props => `${props.width}px`};
    height: ${props => `${props.width}px`};
    background: ${props => props.isDark ? props.theme.color.main.n : props.theme.color.lightBackground};
    color: ${props => props.isDark ? props.theme.color.lightFont : props.theme.color.darkFont};
    border: none;
    transition: border .2s;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 3px solid transparent;
    outline:none;
    @media ${device.desktopL} { 
        width: ${props => `${1.2 * props.width}px`};
    }
    & div {
        overflow: hidden;

        width: 80%;
    }
    &:focus {
        border: 3px solid ${props => props.theme.color.highlightColor};
        transition: border .2s;
    }  
`;

const CoolStyledCheck = styled.div<AllProps>`
    z-index: 3;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    & svg {
        font-size: 2rem;
        width: 100%;
        height: 100%;
        color: ${props => props.isDark ? props.theme.color.lightFont : props.theme.color.main.n};
        box-sizing: border-box;
    }
`

const CoolStyledLabel = styled.label`
    margin-left: 10px;
`



const getSize = (size?: SizeEnum): SizeProps => {
    switch (size) {
        case SizeEnum.L:
            return { width: 20, fontSize: '2rem' }
        case SizeEnum.M:
            return { width: 20, fontSize: '2rem' }
        case SizeEnum.S:
            return { width: 20, fontSize: '2rem' }
        case SizeEnum.XS:
            return { width: 20, fontSize: '2rem' }
        default:
            return { width: 20, fontSize: '2rem' }
    }
}

export function CoolCheckbox({ id, value, setValue, size, isDark, label, width }: {
    id?: string, value: boolean, setValue: React.Dispatch<React.SetStateAction<boolean>>, size?: SizeEnum, isDark?: boolean, label: string, width?: string
}) {

    const sizeInfo = getSize(size)

    const onClick = () => {
        setValue((old) => !old)
    }

    return (
        <MainBox totalWidth={width} onClick={onClick}>
            <HiddenCheckbox setValue={setValue} value={value} />
            <CustomCheckbox width={sizeInfo.width} fontSize={sizeInfo.fontSize}>
                <CoolStyledCheckbox width={sizeInfo.width} fontSize={sizeInfo.fontSize} isDark={isDark} />
                {value ? <CoolStyledCheck fontSize={sizeInfo.fontSize} width={sizeInfo.width} isDark={isDark}><BsCheck /></CoolStyledCheck> : <></>}
            </CustomCheckbox>
            <CoolStyledLabel>{label}</CoolStyledLabel>
        </MainBox>
    )
}