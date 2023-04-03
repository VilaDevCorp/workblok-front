import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { SizeEnum } from '../../types/types';
import { ButtonBase } from '../bases/ButtonBase';
import { device } from '../../StyledTheme';
import { CoolIcon, IconTypeEnum } from './CoolIcon';
import { ThemeColors } from '../../styled';

export enum ButtonStyleEnum {
    OUTLINED, FILLED, TRANSPARENT
}

interface SizeProps {
    width?: number //UNIT: px
}

interface AllProps extends SizeProps {
    style?: ButtonStyleEnum
    disabled?: boolean;
    color?: keyof ThemeColors;
}

const CoolStyledButton = styled(ButtonBase) <AllProps>`
    padding: 14px 24px;
    font-size: ${props => props.theme.fontSize.buttonText};
    min-height: 46px;
    height: 46px;
    flex-shrink: 0;
    box-sizing: border-box;
    border-radius: 14px;
    min-width: ${props => props.width ? `${props.width}px` : undefined};
    width: ${props => props.width ? `${props.width}px` : undefined};
    background-color: ${props => props.disabled ?
        props.theme.color[props.color ? props.color : 'main'].l5
        :
        (
            props.style === ButtonStyleEnum.FILLED ?
                props.theme.color[props.color ? props.color : 'main'].l1 :
                'transparent')};
    outline:none;
    color: ${props => props.style === ButtonStyleEnum.FILLED ?
        props.theme.color.main.l7 : props.theme.color[props.color ? props.color : 'main'].l2};
    border: ${props => props.style === ButtonStyleEnum.OUTLINED ? `2px solid ${props.theme.color[props.color ? props.color : 'main'].l3}}` : '2px solid transparent'};
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    & svg {
        font-size: 1.2rem;
    }
    transition: background .2s;
    
    &:hover {
        transition: background .2s;
        border-color: ${props => props.disabled ? undefined : (props.style === ButtonStyleEnum.OUTLINED ? props.theme.color[props.color ? props.color : 'main'].d1 : undefined)} !important ;
        color: ${props => props.disabled ? undefined : (props.style === ButtonStyleEnum.OUTLINED ? props.theme.color[props.color ? props.color : 'main'].d1 : undefined)} !important;
        background: ${props => props.disabled ?
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

const getSize = (size?: SizeEnum): SizeProps => {
    switch (size) {
        case SizeEnum.L:
            return { width: 250 }
        case SizeEnum.M:
            return { width: 200 }
        case SizeEnum.S:
            return { width: 150 }
        case SizeEnum.XS:
            return { width: 100 }
        default:
            return { width: undefined }
    }
}



export function CoolButton({ onClick, children, className, iconType, size, style = ButtonStyleEnum.FILLED, disabled = false, color }: {
    onClick?: MouseEventHandler<HTMLButtonElement>, children?: string | JSX.Element | JSX.Element[] | null, className?: string, iconType?: IconTypeEnum,
    size?: SizeEnum, style?: ButtonStyleEnum, disabled?: boolean, color?: keyof ThemeColors
}) {

    const sizeInfo = getSize(size)

    return (
        <CoolStyledButton disabled={disabled} className={className} width={sizeInfo.width}
            onClick={onClick} style={style} color={color}>
            {iconType !== undefined ? <CoolIcon type={iconType} /> : <></>}
            <>
                {children}
            </>
        </CoolStyledButton>
    )
}