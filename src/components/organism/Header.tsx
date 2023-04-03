import { useNavigate } from 'react-router-dom';
import headerImg from './../../../public/logo.svg';
import styled from 'styled-components'
import { HeaderUser } from '../molecule/HeaderUser';
import { TopMenu } from '../molecule/TopMenu';
import { device, screenSize } from '../../StyledTheme';
import { CoolSidebar } from './CoolSidebar';
import { CoolSidebarOption } from '../atom/CoolSidebarOption';
import { useEffect, useState } from 'react';
import { CoolIconButton } from '../atom/CoolIconButon';
import { IconTypeEnum } from '../atom/CoolIcon';
import { ButtonStyleEnum } from '../atom/CoolButton';
import { useMisc } from '../../hooks/useMisc';
import { SizeEnum } from '../../types/types';
import { useScreen } from '../../hooks/useScreen';




const MainBox = styled.div`
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 2vh 5vw;
    align-items: center;
    & img {
        height: 60px;
        width: 100px;
        @media ${device.tablet} { 
            height: 50px;
            width: 80px;
        }
    } 
`;
const HeaderLogo = styled.img`
    cursor: pointer;
    margin-left: 10px;
`;


export function Header() {
    const navigate = useNavigate()
    const { screenWidth } = useScreen()
    const { setOpenSidebar, blockedSidebar, setBlockedSidebar } = useMisc()

    const onOpenSidebar = () => {
        if (!blockedSidebar) {
            setBlockedSidebar(true)
            setOpenSidebar(true)
        }
    }

    return (
        <MainBox>
            {screenWidth > screenSize.tablet ?
                <></> :
                <CoolIconButton type={IconTypeEnum.MENU} style={ButtonStyleEnum.TRANSPARENT} color={'main'} onClick={onOpenSidebar} size={SizeEnum.S} />}
            <HeaderLogo src={headerImg} alt='Logo header' style={{ cursor: 'pointer' }} onClick={() => navigate('/')}></HeaderLogo>
            {screenWidth > screenSize.tablet ?
                <TopMenu />
                :
                <CoolSidebar options={[
                    <CoolSidebarOption id='planning' route={'/'} />,
                    <CoolSidebarOption id='activities' route={'/activities'} />]} />
            }
            <HeaderUser />
        </MainBox>
    )
}