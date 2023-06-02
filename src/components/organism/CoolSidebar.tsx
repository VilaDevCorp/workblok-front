import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components'
import { useClickOutside } from '../../hooks//useClickOutside';
import { useMisc } from '../../hooks//useMisc';
import { useModal } from '../../hooks//useModal';
import { SizeEnum } from '../../types/types';
import { CoolButton } from '../atom/CoolButton';
import { IconTypeEnum } from '../atom/CoolIcon';
import { CoolIconButton } from '../atom/CoolIconButon';



const showSidebarAnimation = keyframes`
  0%   {left:-300px;}
  100%   {left:0px}
`
const hideSidebarAnimation = keyframes`
  0%   {left:0px}
  100%   {left:-300px;}
`

const MainBox = styled.div`
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    background: ${props => props.theme.color.main.l1};
    box-sizing: border-box;
    padding: 14px 24px;
    width: 300px;
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
    z-index: 5;
    top: 0;
    left:0;
    height: 100vh;
    position: absolute;
    gap: 40px;
    animation: ${showSidebarAnimation} .3s;
    animation-timing-function: ease-in-out;
    &.closeSidebar {
        animation: ${hideSidebarAnimation} .3s;
        animation-timing-function: ease-in-out;
        left: -300px;
    }
    & img {
        height: 100%;
    }
`;

const OptionsBox = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
`

export function CoolSidebar({ options = [] }: { options?: JSX.Element[] }) {
    const { openSidebar, setOpenSidebar, blockedSidebar, setBlockedSidebar } = useMisc()
    //This state manages the sidebar visibility
    const [visibleSidebar, setVisibleSidebar] = useState(false)
    const { t } = useTranslation()
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    // useClickOutside(wrapperRef, () => setOpenSidebar(false));
    
    useEffect(() => {
        if (openSidebar) {
            setVisibleSidebar(true)
            setTimeout(() => {
                setBlockedSidebar(false)
            }, 500);
        } else {
            setTimeout(() => {
                setVisibleSidebar(false)
                setBlockedSidebar(false)
            }, 500);
        }
    }, [openSidebar])

    const onCloseSidebar = () => {
        if (!blockedSidebar) {
            setBlockedSidebar(true)
            setOpenSidebar(false)
        }
    }


    return (
        visibleSidebar ?
            <MainBox ref={wrapperRef} className={openSidebar ? '' : 'closeSidebar'} >
                <CoolButton iconType={IconTypeEnum.CLOSE} onClick={onCloseSidebar}>
                    {t('button.close')}
                </CoolButton>
                <OptionsBox>
                    {options.map((option) => option)}
                </OptionsBox>
            </MainBox>
            :
            <></>
    )
}