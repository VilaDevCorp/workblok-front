import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components'
import { useClickOutside } from '../../hooks/useClickOutside';
import { useMisc } from '../../hooks/useMisc';
import { SizeEnum } from '../../types/types';
import { VilaButton } from './VilaButton';



const showSidebarAnimation = keyframes`
  0%   {left:-300px;}
  100%   {left:0px}
`
const hideSidebarAnimation = keyframes`
  0%   {left:0px}
  100%   {left:-300px;}
`

const MainBox = styled.div`
    animation: ${showSidebarAnimation} .3s;
    animation-timing-function: ease-in-out;
    &.closeSidebar {
        animation: ${hideSidebarAnimation} .3s;
        animation-timing-function: ease-in-out;
        left: -300px;
    }
`;

export interface MenuOption {
    label: string
    route: string
}

export function VilaSidebar({ options = [] }: { options?: MenuOption[] }) {
    const { openSidebar, setOpenSidebar, blockedSidebar, setBlockedSidebar } = useMisc()
    //This state manages the sidebar visibility
    const [visibleSidebar, setVisibleSidebar] = useState(false)
    const { t } = useTranslation()
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(wrapperRef, () => setOpenSidebar(false));
    const navigate = useNavigate()

    useEffect(() => {
        if (openSidebar) {
            setVisibleSidebar(true)
            setTimeout(() => {
                setBlockedSidebar(false)
            }, 300);
        } else {
            setTimeout(() => {
                setVisibleSidebar(false)
                setBlockedSidebar(false)
            }, 300);
        }
    }, [openSidebar])

    const onCloseSidebar = () => {
        if (!blockedSidebar) {
            setBlockedSidebar(true)
            setOpenSidebar(false)
        }
    }

    const onGoTo = (route: string) => {
        if (!blockedSidebar) {
            setBlockedSidebar(true)
            setOpenSidebar(false)
            navigate(route)
        }
    }

    return (
        visibleSidebar ?
            <div className={`flex font-["Montserrat"] overflow-y-auto flex-col box-border px-2 py-4 w-[200px] rounded-tr-lg rounded-br-lg z-[5] 
                top-0 left-0 bg-background-400 h-full absolute gap-4 text-lightFont-400  ${openSidebar ? 'animate-showSidebar' : 'animate-hideSidebar left-[-300px]'} `} ref={wrapperRef} >
                <VilaButton icon='close' font='lightFont' buttonStyle={'outlined'} onClick={onCloseSidebar}>
                    {'Close'}
                </VilaButton>
                <nav className='flex gap-4 flex-col px-4 text-lg'>
                    {options.map((option) => <a key={option.label} className='cursor-pointer' onClick={() => onGoTo(option.route)}>{option.label}</a>)}
                </nav>
            </div>
            :
            <></>
    )
}