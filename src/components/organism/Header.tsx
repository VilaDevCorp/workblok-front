import { useNavigate } from 'react-router-dom';
import headerImg from './../../../public/logo.svg';
import styled from 'styled-components'
import { HeaderUser } from '../molecule/HeaderUser';
import { HeaderMenu } from '../molecule/HeaderMenu';




const MainBox = styled.div`
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 15vh;
    box-sizing: border-box;
    padding: 3vh 10%;
    max-height: 110px;
    align-items: center;
    & img {
        height: 100%;
    } 
`;

export function Header() {
    const navigate = useNavigate()

    return (
        <MainBox>
            <img src={headerImg} alt='Logo header' style={{ cursor: 'pointer' }} onClick={() => navigate('/')}></img>
            <HeaderMenu/>
            <HeaderUser />
        </MainBox>
    )
}