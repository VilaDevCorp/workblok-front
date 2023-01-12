import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { ButtonStyleEnum, IconTypeEnum, SizeEnum } from '../../types/types';
import { ButtonBase } from '../bases/ButtonBase';
import { device } from '../../StyledTheme';
import { CoolIcon } from './CoolIcon';

interface SizeProps {
    width: number //UNIT: px
    height: number //UNIT: px
    fontSize: string
}

interface AllProps extends SizeProps {
    style?: ButtonStyleEnum
    isIcon?: boolean;
    isActive?: boolean;
}

const CoolStyledButton = styled(ButtonBase) <AllProps>`
    padding: ${props => props.isIcon ? '0' : '5px'};
    font-size: ${props => props.fontSize};
    border-radius: ${props => props.isIcon ? '50%' : '12px'};
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};
    background-color: ${props => props.isActive ? (
        props.style === ButtonStyleEnum.FILLED ?
            props.theme.color.main.l3 :
            'transparent')
        :
        props.theme.color.main.l5};

    color: ${props => props.style === ButtonStyleEnum.FILLED ? props.theme.color.lightFont : props.theme.color.main.l3};
    border: ${props => props.style === ButtonStyleEnum.OUTLINE ? `1.5px solid ${props.theme.color.main.l3}}` : '2px solid transparent'};
    transition: background .2s;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    @media ${device.desktopL} { 
        width: ${props => `${1.2 * props.width}px`};
        height: ${props => `${1.2 * props.height}px`};
    }

    & svg {
        font-size: 1.2rem;
        width: ${props => props.isIcon ? '100%' : '20%'};
        margin-right: ${props => props.isIcon ? '0%' : '5%'};
        box-sizing: border-box;
    }
    & div {
        overflow: hidden;

        width: 80%;
    }
    transition: background .2s;
    
    &:hover {
        transition: background .2s;
        border-color: ${props => props.style === ButtonStyleEnum.OUTLINE ? props.theme.color.main.d1 : undefined} ;
        color: ${props => props.style === ButtonStyleEnum.OUTLINE ? props.theme.color.main.d1 : undefined} ;
        background: ${props => props.isActive ? (
        props.style === ButtonStyleEnum.FILLED ?
            props.theme.color.main.d1
            :
            props.theme.color.mainLowOp)
        :
        undefined};
    }

    &:active {
    border: 2px solid ${props => props.isActive ? props.theme.color.highlightColor : 'transparent'} !important;
    }
`;




export function CoolButton({ clickFun, children, className, type, size, style = ButtonStyleEnum.FILLED, isIcon = false, isActive = true }: {
    clickFun?: MouseEventHandler<HTMLButtonElement>, children?: JSX.Element | JSX.Element[], className?: string, type?: IconTypeEnum,
    size?: SizeEnum, style?: ButtonStyleEnum, isIcon?: boolean, isActive?: boolean
}) {

    const getLabel = (): string => {
        switch (type) {
            case IconTypeEnum.CONFIRM:
                return 'Confirmar'
            case IconTypeEnum.CANCEL:
                return 'Cancelar'
            case IconTypeEnum.DELETE:
                return 'Eliminar'
            case IconTypeEnum.LOGIN:
                return 'Entrar'
            default:
                return ''
        }
    }

    const getSize = (): SizeProps => {
        switch (size) {
            case SizeEnum.L:
                return isIcon ? { width: 130, height: 40, fontSize: '.9rem' } : { width: 140, height: 40, fontSize: '.9rem' }
            case SizeEnum.M:
                return isIcon ? { width: 130, height: 40, fontSize: '.9rem' } : { width: 130, height: 40, fontSize: '.8rem' }
            case SizeEnum.S:
                return isIcon ? { width: 130, height: 40, fontSize: '.9rem' } : { width: 110, height: 30, fontSize: '.8rem' }
            case SizeEnum.XS:
                return isIcon ? { width: 25, height: 25, fontSize: '.8rem' } : { width: 130, height: 40, fontSize: '.8rem' }
            default:
                return { width: 140, height: 40, fontSize: '.8rem' }
        }
    }



    const sizeInfo = getSize()

    return (
        <CoolStyledButton isIcon={isIcon} isActive={isActive} className={className} height={sizeInfo.height} width={sizeInfo.width}
            fontSize={sizeInfo.fontSize} clickFun={clickFun} style={style}>
            {type !== undefined ? <CoolIcon type={type} /> : <></>}
            {children ? <div>{children}</div> : <></>}
        </CoolStyledButton>
    )
}