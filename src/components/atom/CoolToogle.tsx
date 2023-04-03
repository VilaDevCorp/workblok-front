import React from 'react';
import styled from 'styled-components';
import { SizeEnum } from '../../types/types';
import { ButtonBase } from '../bases/ButtonBase';


interface SizeProps {
    width: number //UNIT: px
}

interface AllProps extends SizeProps {
    disabled?: boolean;
}

const MainBox = styled.div<AllProps>`
    display:flex;
    padding: 14px 24px;
    font-size: ${props => props.theme.fontSize.buttonText};
    width: ${props => `${props.width}px`};
    min-height: 52px;
    height: 52px;
    opacity: ${props => props.disabled ? .5 : 1};
    & .activeElement {
        background-color: ${props => props.theme.color.main.l3};
        color: ${props => props.theme.color.background.n}
    }
    transition: background .2s;
    &:hover >:not(.activeElement) {
        transition: background .2s;
        background-color: ${props => props.disabled ? undefined : props.theme.color.main.l6};
    }

`;
const LeftElement = styled.div`
    display:flex;
    width : 50%;
    border: ${props => `2px solid ${props.theme.color.main.l3}}`};
    border-top-left-radius: 14px;
    border-bottom-left-radius: 14px;
    border-right: none;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`;
const RightElement = styled.div`
    display:flex;
    width : 50%;
    border: ${props => `2px solid ${props.theme.color.main.l3}}`};
    border-left: none;
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
`;


const getSize = (size?: SizeEnum): SizeProps => {
    switch (size) {
        case SizeEnum.L:
            return { width: 150 }
        case SizeEnum.M:
            return { width: 130 }
        case SizeEnum.S:
            return { width: 110 }
        case SizeEnum.XS:
            return { width: 90 }
        default:
            return { width: 130 }
    }
}


export function CoolToogle({ value, setValue, leftElement, rightElement, size, disabled }: {
    value: boolean, setValue: React.Dispatch<React.SetStateAction<boolean>>, leftElement?: JSX.Element | JSX.Element[],
    rightElement?: JSX.Element | JSX.Element[], size?: SizeEnum, disabled?: boolean
}) {

    const sizeInfo = getSize(size)

    return (
        <MainBox width={sizeInfo.width} onClick={() => disabled ? undefined : setValue((old) => !old)} disabled={disabled}>
            <LeftElement className={value ? 'activeElement' : ''}>
                {leftElement}
            </LeftElement>
            <RightElement className={!value ? 'activeElement' : ''}>
                {rightElement}
            </RightElement>
        </MainBox>
    )
}