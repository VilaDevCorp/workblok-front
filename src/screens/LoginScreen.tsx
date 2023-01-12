import React, { FC, ReactNode, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';
import { ButtonBase } from '../components/bases/ButtonBase';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';
import loginImg from './../../public/loginImg.png';
import { FaSignInAlt } from 'react-icons/fa'
import { TextInputBase, TextInputTypeEnum } from '../components/bases/TextInputBase';
import { CoolTextInput } from '../components/atom/CoolTextInput';
import { CoolFormElement } from '../components/atom/CoolFormElement';
import { CoolButton } from '../components/atom/CoolButton';
import { IconTypeEnum } from '../types/types';

const MainBox = styled.div`
    display: flex;
    position:absolute;
    top: 0;
    background: ${props => props.theme.color.main.n};
    box-sizing: border-box;
    z-index: 80;
    padding: 1% 2%;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    transition: opacity 1s;
    &.hidden {
        transition: opacity 1s;
        opacity:0%;
    }
`;

const LoginBox = styled.div`
    display: flex;
    gap: 2vh;
    box-sizing: border-box;
    padding: 1% 2%;
    background-color: ${props => props.theme.color.background.n};
    width: 30%;
    padding: 10vh 0;
    height: 100vh;
    justify-content:center;
    flex-direction: column;
    align-items: center;
    & img {
        width: 150px;
        height: 150px;     
        margin-bottom: 5%;   
    }
`;

const LoginButton = styled(CoolButton)`
    margin-top: 3vh;
`;


export function LoginScreen() {

    const { login, logout, fakeDelay } = useApi()
    const authInfo = useAuth()
    const navigate = useNavigate()
    const theme = useTheme()

    const renderNum = useRef<number>(0)

    const [mail, setMail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showScreen, setShowScreen] = useState<boolean>(false)
    const [isHidden, setIsHidden] = useState<boolean>(false)


    useEffect(() => {
        if (renderNum.current === 0) {
            if (authInfo.isAuth) {
                setShowScreen(false)
            } else {
                setShowScreen(true)
            }
            renderNum.current = ++renderNum.current
        } else {
            if (isHidden) {
                setTimeout(() => {
                    setShowScreen(false)
                }, 2000);
            }
        }
    }, [isHidden])


    const onLogin = async () => {
        if (mail !== '' && password !== '') {
            setIsLoading(true)
            try {
                await authInfo.login(mail, password)

                setIsHidden(true)
                navigate('/')
            } catch (e) {
                setIsLoading(false)
            }
            setIsLoading(false)
        }
    }

    return (
        showScreen ?
            <MainBox className={isHidden ? 'hidden' : ''}>
                <LoginBox>
                    <img src={loginImg} alt='Logo login' />
                    <CoolFormElement label='Email'>
                        <CoolTextInput id={'mail'} value={mail} setValue={setMail} />

                    </CoolFormElement>
                    <CoolFormElement label='Contraseña'>
                        <CoolTextInput id={'password'} value={password} setValue={setPassword} type={TextInputTypeEnum.PASSWORD} />
                    </CoolFormElement>
                    <LoginButton clickFun={() => onLogin()} type={IconTypeEnum.LOGIN} ></LoginButton>
                </LoginBox>
            </MainBox>
            : <></>
    )
}