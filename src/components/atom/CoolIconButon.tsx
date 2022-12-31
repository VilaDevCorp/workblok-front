import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { ButtonStyleEnum, ButtonTypeEnum, IconTypeEnum, SizeEnum } from '../../types/types';
import { device } from '../../StyledTheme';
import { ButtonBase } from '../bases/ButtonBase';
import { CoolIcon } from './CoolIcon';


interface SizeInfoProps {
    width: number //UNIT: px
    height: number //UNIT: px
    fontSize: string
}

interface CoolStyledIconButtonProps extends SizeInfoProps {
    isDark: boolean
    isActive: boolean
    padding?: number
    style: ButtonStyleEnum
}

const CoolStyledIconButton = styled(ButtonBase) <CoolStyledIconButtonProps>`
    color: ${props => props.theme.color.lightFont};
    border-radius: 50%;
    @media ${device.desktopL} { 
        width: ${props => `${1.2 * props.width}px`};
        height: ${props => `${1.2 * props.height}px`};
    }
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};
    border: none;
    font-size: ${props => `${props.fontSize}`};
    opacity: ${props => props.isActive ? 1 : .5};
    background-color: ${props => props.isActive ? props.theme.color.mainColor : props.theme.color.inactive};
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 2px solid transparent;
    padding: ${props => `${props.padding}px`};
    &:hover {
        background-color: ${props => props.style === ButtonStyleEnum.FILL ? props.isActive ? props.theme.color.lightMain : undefined : 'transparent'};
    }
    &:active{
    border-color: ${props => props.isActive ? props.theme.color.highlightColor : undefined};
    }
    &:hover svg {
    }
    `;


export function CoolIconButton({ clickFun, className, type, size, isDark = false, isActive = true, buttonStyle = ButtonStyleEnum.FILL }: {
    clickFun?: MouseEventHandler<HTMLButtonElement>, className?: string, type: IconTypeEnum, size?: SizeEnum, isDark?: boolean, isActive?: boolean,
    buttonStyle?: ButtonStyleEnum
}) {

    const getSize = (): SizeInfoProps => {
        switch (size) {
            case SizeEnum.L:
                return { width: 70, height: 70, fontSize: '5rem' }
            case SizeEnum.M:
                return { width: 60, height: 60, fontSize: '5rem' }
            case SizeEnum.S:
                return { width: 40, height: 40, fontSize: '5rem' }
            case SizeEnum.XS:
                return { width: 25, height: 25, fontSize: '5rem' }
            default:
                return { width: 60, height: 60, fontSize: '5rem' }
        }
    }
    const getColor = (): SizeInfoProps => {
        switch (size) {
            case SizeEnum.L:
                return { width: 70, height: 70, fontSize: '5rem' }
            case SizeEnum.M:
                return { width: 60, height: 60, fontSize: '5rem' }
            case SizeEnum.S:
                return { width: 50, height: 50, fontSize: '5rem' }
            case SizeEnum.XS:
                return { width: 25, height: 25, fontSize: '5rem' }
            default:
                return { width: 60, height: 60, fontSize: '5rem' }
        }
    }

    const sizeInfo = getSize()

    return (
        <CoolStyledIconButton style={buttonStyle} padding={size === SizeEnum.XS ? 2 : undefined} height={sizeInfo.height} width={sizeInfo.width} fontSize={sizeInfo.fontSize} isDark={isDark} isActive={isActive} clickFun={isActive ? clickFun : undefined}>
            <CoolIcon type={type} />
        </CoolStyledIconButton>
    )
}