import {PuffLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';
import loadingScreenImg from './../../../public/loadingScreenImg.png'


const MainBox = styled.div`
    display: flex;
    background: ${props=> props.theme.color.main.n};
    box-sizing: border-box;
    flex-direction: column;
    padding: 1% 2%;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    & img {
        width: 200px;
        height: 200px;
        margin-bottom: 5vh;
    }
    & span {
        margin-right: 15px;
    }
`;


export function CoolLoadingScreen() {

    const theme = useTheme()

    return (
        <MainBox>
            <img src={loadingScreenImg} alt='Imagen cargando página' style={{ cursor: 'pointer' }}></img>
            <PuffLoader color={theme.color.background.l3} loading size={75}  />
        </MainBox>
    )
}