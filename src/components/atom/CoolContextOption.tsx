import React, { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { clearContextAtom } from '../../recoil/mainAtoms';
import { device } from '../../StyledTheme';
import { IconTypeEnum } from '../../types/types';
import { CoolIcon } from './CoolIcon';


const MainBox = styled.div`
    display: flex;
    width: 100%;
    background: ${props => props.theme.color.background.l1};
    box-sizing: border-box;
    height: 6vh;
    
    padding: 1vh 10%;
    &:first-child {
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }

    &:last-child {
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
    }

    justify-content:center;
    
    align-items: center;
    &:not(:first-child) {
        border-top: 1px solid ${props => props.theme.color.mainLowOp};
    }
    color: ${props => props.theme.color.lightFont};
    &:hover {
        background-color: ${props => props.theme.color.main.l5}
    }
    
    @media ${device.desktop} {
        height: 2vh;
    }
`;

const IconBox = styled.span`
    display: flex;
    width: 25%;
    height: 5vh;
    font-size: ${props => props.theme.fontSize.regularText};
    box-sizing: border-box;
    align-items: center;
    @media ${device.desktopL} {
    }
`;

const LabelBox = styled.span`
    display: flex;
    width: 75%;
    margin-left: 5%;
    font-size: ${props => props.theme.fontSize.regularText};
    background-color: transparent;
    box-sizing: border-box;
    @media ${device.desktopL} {
    }
`;

interface IconLabel {
    icon: JSX.Element
    label: string
}

export function CoolContextOption({ label, type, onClick }: { label: string, type: IconTypeEnum, onClick: () => void }) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const setClearContext = useSetRecoilState<boolean>(clearContextAtom)

    return (
        <MainBox onClick={() => { setClearContext((old) => !old); onClick(); }}>
            <IconBox><CoolIcon type={type} /></IconBox>
            <LabelBox>{label}</LabelBox>
        </MainBox>
    )
}