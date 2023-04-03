import { useRef } from 'react';
import styled from 'styled-components';
import { useMisc } from '../../hooks/useMisc';
import { CoolIcon, IconTypeEnum } from './CoolIcon';

export interface ContextOption {
    type: IconTypeEnum;
    label: string;
    multi?: boolean;
    onClick: (selectedElements: string[]) => any;
}

interface ContextOptionProps {
    disabled?: boolean
}

const MainBox = styled.div<ContextOptionProps>`
    display: flex;
    gap: 4px;
    width: 100%;
    background: ${props => props.disabled ? props.theme.color.background.l1 : props.theme.color.background.l1};
    box-sizing: border-box;
    min-height: 46px;
    height: 46px;
    padding: 14px 24px; 
    align-items: center;
    color: ${props => props.disabled ? props.theme.color.main.d1 : props.theme.color.main.l7};

    &:first-child {
        border-top-left-radius: 14px;
        border-top-right-radius: 14px;
    }

    &:last-child {
        border-bottom-left-radius: 14px;
        border-bottom-right-radius: 14px;
    }

    &:not(:first-child) {
        border-top: 1px solid ${props => props.theme.color.main.lowOp};
    }
    &:hover {
        color: ${props => props.disabled ? undefined : props.theme.color.main.d7};
        background-color: ${props => props.disabled ? undefined : props.theme.color.main.l5};
    }
`;

const IconBox = styled.span`
display: flex;
font-size: ${props => props.theme.fontSize.highText};
box-sizing: border - box;
align-items: center;
`;

const LabelBox = styled.span`
display: flex;
font-size: ${props => props.theme.fontSize.regularText};
background-color: transparent;
box-sizing: border - box;
`;

interface IconLabel {
    icon: JSX.Element
    label: string
}

export function CoolContextOption({ label, type, disabled, onClick }: { label: string, type: IconTypeEnum, disabled?: boolean, onClick: () => void }) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const { setClearContext } = useMisc()

    return (
        <MainBox disabled={disabled} onClick={disabled ? () => false : () => { setClearContext((old) => !old); onClick(); }}>
            <IconBox><CoolIcon type={type} /></IconBox>
            <LabelBox>{label}</LabelBox>
        </MainBox>
    )
}