import React, { } from 'react';
import {BounceLoader, DotLoader, PropagateLoader, PuffLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';
// import loadingScreenImg from './../../resources/loadingScreenImg.png'
import loadingScreenImg from './../../../public/logo.svg'


const MainBox = styled.div`
    display: flex;
    background: ${props=> props.theme.color.bgColor};
    box-sizing: border-box;
    flex-direction: column;
    padding: 1% 2%;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    & img {
        width: 250px;
        height: 250px;
        margin-bottom: 5vh;
    }
`;


export function LoadingScreen() {

    const theme = useTheme()

    return (
        <MainBox>
            <img src={loadingScreenImg} alt='Imagen cargando página' style={{ cursor: 'pointer' }}></img>
            <PuffLoader color={theme.color.lightFont} loading size={90}  />
        </MainBox>
    )
}