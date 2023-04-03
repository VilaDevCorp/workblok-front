import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useMisc } from '../../hooks/useMisc';
import { SizeEnum } from '../../types/types';
import { ButtonStyleEnum } from './CoolButton';
import { CoolIcon, IconTypeEnum } from './CoolIcon';
import { CoolIconButton } from './CoolIconButon';


const MainBox = styled.div`
    color: ${props => props.theme.color.main.l7};    
    box-sizing: border-box;
    display: contents;
    flex-direction: column;
    flex-grow: 1;
    & button {
        cursor: pointer;

    } 
    gap: 20px;
`;

interface OptionProps {
    nOptions?: number
    isCurrent?: boolean
}


const OptionBox = styled.div<OptionProps>`
    display: flex;
    gap: 10px;
    box-sizing: border-box;
    padding: 14px 20px;
    height: 46px;
    border-radius: 14px;
    align-items: center;
    cursor: ${props => props.isCurrent ? 'default' : 'pointer'};
    transition: background .3s;
    background-color: ${props => props.isCurrent ? props.theme.color.main.d1 : undefined};
    & .optionIcon {
        margin-left:auto;
    }
    &:hover {
        transition: background .3s;
        background-color: ${props => props.isCurrent ? undefined : props.theme.color.main.d3};
    }
`;

const showOptionsAnimation = (nOptions: number) => keyframes`
  0%   {max-height:0px;}
  100%   {max-height: 500px;}
`

const hideOptionsAnimation = (nOptions: number) => keyframes`
  0%   {max-height: 500px;}
  100%   {max-height:0px}
`

const ChildrenBox = styled.div<OptionProps>`
    padding-left: 20px;
    display: flex;
    overflow: hidden;
    max-height: 0px;
    &.fold {
        max-height: 0px;
        animation: ${props => hideOptionsAnimation(props.nOptions ? props.nOptions : 0)} .5s;
        animation-timing-function: ease-in-out;
    }

    &.unfold {
        max-height: 500px;
        animation: ${props => showOptionsAnimation(props.nOptions ? props.nOptions : 0)} .5s;
        animation-timing-function: ease-in-out;
    }
    flex-direction: column;
    gap:10px;
`;

export function CoolSidebarOption({ id, route, iconType, children }: { id: string, route?: string, iconType?: IconTypeEnum, children?: JSX.Element[] }) {

    const { t } = useTranslation()
    const { setOpenSidebar } = useMisc()
    const navigate = useNavigate()
    const location = useLocation()
    const [unfold, setUnfold] = useState<boolean | undefined>(undefined)
    const isCurrent = location.pathname === route

    const onNavigateRoute = (route: string) => {
        if (!isCurrent) {
            navigate(route)
            setOpenSidebar(false)
        } 
    }

    return (
        <MainBox>
            <OptionBox isCurrent={isCurrent} onClick={() => route ? onNavigateRoute(route) : setUnfold((old) => !old)}>
                {iconType ? <CoolIcon type={iconType} /> : undefined}
                {t(`sidebar.${id}`)}
                {children ?
                    <CoolIconButton className='optionIcon' style={ButtonStyleEnum.TRANSPARENT} size={SizeEnum.XS} type={unfold ? IconTypeEnum.UNFOLD : IconTypeEnum.FOLD} />
                    : undefined
                }
            </OptionBox>
            <ChildrenBox nOptions={children ? children.length : 0} className={unfold === undefined ? '' : unfold ? 'unfold' : 'fold'}>
                {
                    children
                }
            </ChildrenBox>
        </MainBox >
    )
}