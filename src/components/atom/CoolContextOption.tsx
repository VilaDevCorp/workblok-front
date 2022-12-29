import React, { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { clearContextAtom } from '../../recoil/mainAtoms';
import { device } from '../../StyledTheme';
import {IconTypeEnum } from '../../types/types';
import { CoolIcon } from './CoolIcon';


const MainBox = styled.div`
    display: flex;
    width: 100%;
    background: ${props => props.theme.color.lightBackground};
    box-sizing: border-box;
    height: 6vh;
    
    padding: 1vh 10%;
    justify-content:center;
    align-items: center;
    &:not(:first-child) {
        border-top: 1px solid ${props => props.theme.color.mainColorLowOp};
    }
    color: ${props => props.theme.color.mainColor};
    &:hover {
        color: ${props => props.theme.color.lightFont};
        background-color: ${props => props.theme.color.buttonHover}
    }
    
    @media ${device.desktop} {
        height: 2vh;
    }
`;

const IconBox = styled.span`
    display: flex;
    width: 25%;
    height: 5vh;
    font-size: ${props => props.theme.fontSize.buttonLabel};
    box-sizing: border-box;
    align-items: center;
    @media ${device.desktopL} {
    }
`;

const LabelBox = styled.span`
    display: flex;
    width: 75%;
    margin-left: 5%;
    font-size: ${props => props.theme.fontSize.title};
    background-color: transparent;
    box-sizing: border-box;
    @media ${device.desktopL} {
    }
`;

interface IconLabel {
    icon: JSX.Element
    label: string
}

const getLabel = (type: IconTypeEnum) => {
    switch (type) {
        case IconTypeEnum.EDIT:
            return 'Editar'
        case IconTypeEnum.DELETE:
            return 'Borrar'
        default:
            ''

    }
}

export function CoolContextOption({ type, onClick }: { type: IconTypeEnum, onClick: () => void }) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const setClearContext = useSetRecoilState<boolean>(clearContextAtom)

    return (
        <MainBox onClick={() => { setClearContext((old) => !old); onClick(); }}>
            <IconBox><CoolIcon type={type} /></IconBox>
            <LabelBox>{getLabel(type)}</LabelBox>
        </MainBox>
    )
}