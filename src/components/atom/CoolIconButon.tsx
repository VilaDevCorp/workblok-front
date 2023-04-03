import { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { SizeEnum } from '../../types/types';
import { ButtonBase } from '../bases/ButtonBase';
import { CoolIcon, IconTypeEnum } from './CoolIcon';
import { ButtonStyleEnum } from './CoolButton';
import { ThemeColors } from '../../styled';


interface SizeInfoProps {
    width: number //UNIT: px
}

interface CoolStyledIconButtonProps extends SizeInfoProps {
    style: ButtonStyleEnum
    disabled?: boolean
    color?: keyof ThemeColors
}

const CoolStyledIconButton = styled(ButtonBase) <CoolStyledIconButtonProps>`
    border-radius: 50%;
    min-width: ${props => `${props.width}px`};
    min-height: ${props => `${props.width}px`};
    width: ${props => `${props.width}px`};
    height: ${props => `${props.width}px`};
    flex-shrink: 0;
    color: ${props => props.style === ButtonStyleEnum.OUTLINED ?
        props.theme.color[props.color ? props.color : 'main'].l2 : props.theme.color.main.l6};
    border: ${props => props.style === ButtonStyleEnum.OUTLINED ? `2px solid ${props.theme.color[props.color ? props.color : 'main'].l3}}` : '2px solid transparent'};
    font-size: 4rem;
    background-color: ${props => props.style === ButtonStyleEnum.TRANSPARENT ? 'transparent' : props.disabled ?
        props.theme.color[props.color ? props.color : 'main'].l3
        :
        (
            props.style === ButtonStyleEnum.FILLED ?
                props.theme.color[props.color ? props.color : 'main'].l1 :
                'transparent')};

    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    transition: background .2s;
    
    &:hover {
        transition: background .2s;
        border-color: ${props => props.disabled ? undefined : (props.style === ButtonStyleEnum.OUTLINED ? props.theme.color[props.color ? props.color : 'main'].d1 : undefined)} !important ;
        color: ${props => props.disabled ? undefined : (props.style === ButtonStyleEnum.OUTLINED ? props.theme.color[props.color ? props.color : 'main'].d1 : undefined)} !important;
        background: ${props => props.style === ButtonStyleEnum.TRANSPARENT ? 'transparent' : props.disabled ?
        undefined
        :
        (
            props.style === ButtonStyleEnum.FILLED ?
                props.theme.color[props.color ? props.color : 'main'].d1
                :
                undefined)};
    }
    &:enabled:active {
        outline:none;
        transform: scale(0.95)
    }
    `;


export function CoolIconButton({ onClick, className, type, size, disabled, style = ButtonStyleEnum.FILLED, color }: {
    onClick?: MouseEventHandler<HTMLButtonElement>, className?: string, type: IconTypeEnum, size?: SizeEnum, disabled?: boolean, style?: ButtonStyleEnum, color?: keyof ThemeColors
}) {

    const getSize = (): SizeInfoProps => {
        switch (size) {
            case SizeEnum.L:
                return { width: 80 }
            case SizeEnum.M:
                return { width: 60 }
            case SizeEnum.S:
                return { width: 40 }
            case SizeEnum.XS:
                return { width: 30 }
            default:
                return { width: 60 }
        }
    }

    const sizeInfo = getSize()

    return (
        <CoolStyledIconButton className={className} width={sizeInfo.width} style={style} disabled={disabled} color={color} onClick={disabled ? undefined : onClick}>
            <CoolIcon type={type} />
        </CoolStyledIconButton>
    )
}