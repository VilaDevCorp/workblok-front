import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { SizeEnum } from '../../types/types';
import { CoolIcon, IconTypeEnum } from '../atom/CoolIcon';
import { ButtonStyleEnum, CoolButton } from '../atom/CoolButton';
import { CoolIconButton } from '../atom/CoolIconButon';
import { device } from '../../StyledTheme';


const MainBox = styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: row;
    max-width: 360px;
    gap: 15px;
`;

const UserInfo = styled.div`
    display: flex;
    max-width: 220px;        
    @media ${device.tablet} {
        max-width: 150px;        
    };
    @media ${device.mobileM} {
        max-width: 110px;        
    };
    overflow: hidden;
    gap: 10px;
    white-space: nowrap;
    font-size: ${props => props.theme.fontSize.highText};
    flex-direction: column;
`
const UserName = styled.div`
    display: flex;
    align-items: center;
    color: ${props => props.theme.color.main.l7};
`;

const UserIcon = styled.div`
    color: ${props => props.theme.color.main.l7};
    border-radius: 60px;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`;

const UserCoins = styled.div`
    display: flex;
    width:100%;
    color: ${props => props.theme.color.highlightColor};
`

const CoinsIcon = styled.div`
    border-radius: 60px;
    width: 25px;
    height: 25px;
    border: none;   
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    box-sizing: border-box;
`;



export function HeaderUser() {

    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const onLogout = async () => {
        logout()
        navigate('/')
    }

    return (
        <MainBox>
            <UserInfo>
                <UserName>
                    <UserIcon>
                        <CoolIcon type={IconTypeEnum.USER} />
                    </UserIcon>
                    {user?.userName}
                </UserName>
                <UserCoins>
                    <CoinsIcon>
                        <CoolIcon type={IconTypeEnum.COINS} />
                    </CoinsIcon>
                    {user?.dans}
                </UserCoins>
            </UserInfo>
            <CoolIconButton style={ButtonStyleEnum.TRANSPARENT} type={IconTypeEnum.LOGOUT} onClick={onLogout} size={SizeEnum.S} />
        </MainBox>
    )
}