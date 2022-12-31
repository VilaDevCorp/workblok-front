import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { IconTypeEnum, SizeEnum } from '../../types/types';
import { ButtonBase } from '../bases/ButtonBase';
import { device } from '../../StyledTheme';
import { CoolIcon } from './CoolIcon';


interface SizeProps {
    width: number //UNIT: px
    height: number //UNIT: px
    fontSize: string
}

interface AllProps extends SizeProps {
    isDark?: boolean
}

const CoolStyledButton = styled(ButtonBase) <AllProps>`
    padding: 5px;
    font-size: ${props => props.fontSize};
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};
    background: ${props => props.isDark ? props.theme.color.mainColor : props.theme.color.lightBackground};
    color: ${props => props.theme.color.lightFont};
    border: none;
    transition: background .2s;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    border-radius: 12px;
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
    transition: background .2s;
    border: 1px solid transparent;

    &:hover {
        transition: background .2s;
        background: ${props => props.theme.color.lightMain};
    }    
    &:active {
        border: 1px solid ${props => props.theme.color.highlightColor};
    }
    
`;


export function CoolButton({ clickFun, className, type, size, isDark = true }: {
    clickFun: MouseEventHandler<HTMLButtonElement>, className?: string, type?: IconTypeEnum,
    size?: SizeEnum, isDark?: boolean
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
            case IconTypeEnum.LOGOUT:
                return 'Logout'
            default:
                return ''
        }
    }

    const getSize = (): SizeProps => {
        switch (size) {
            case SizeEnum.L:
                return { width: 160, height: 70, fontSize: '1.2rem' }
            case SizeEnum.M:
                return { width: 140, height: 60, fontSize: '1.2rem' }
            case SizeEnum.S:
                return { width: 110, height: 40, fontSize: '1rem' }
            case SizeEnum.XS:
                return { width: 100, height: 30, fontSize: '.9rem' }
            default:
                return { width: 120, height: 50, fontSize: '1.2rem' }
        }
    }



    const sizeInfo = getSize()

    return (
        <CoolStyledButton className={className} isDark={isDark} height={sizeInfo.height} width={sizeInfo.width} fontSize={sizeInfo.fontSize} clickFun={clickFun}>
            {type ? <CoolIcon type={type} /> : <></>}
            <div>{getLabel()}</div>
        </CoolStyledButton>
    )
}