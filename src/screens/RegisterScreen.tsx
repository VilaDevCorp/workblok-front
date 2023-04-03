import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';
import loginImg from './../../public/loginImg.png';
import { TextInputTypeEnum } from '../components/bases/TextInputBase';
import { CoolTextInput } from '../components/atom/CoolTextInput';
import { CoolButton } from '../components/atom/CoolButton';
import { CoolForm } from '../components/organism/CoolForm';
import { IconTypeEnum } from '../components/atom/CoolIcon';

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


export function RegisterScreen() {

    const { login, logout, register } = useApi()
    const authInfo = useAuth()
    const navigate = useNavigate()
    const theme = useTheme()

    const [username, setUsername] = useState<string>('')
    const [mail, setMail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(false)


    const onRegister = async () => {
        // if (username !== '' && mail !== '' && password !== '') {
            setIsLoading(true)
            try {
                await register({ username, mail, password })
            } catch (e) {
                setIsLoading(false)
            }
            setIsLoading(false)
        // }
    }

    return (
        <MainBox>
            <LoginBox>
                <img src={loginImg} alt='Logo login' />
                <CoolForm formFields={[{
                    id: 'username', formElement: <CoolTextInput id={'username'} value={username} setValue={setUsername} />
                }, {
                    id: 'mail', formElement: <CoolTextInput id={'mail'} value={mail} setValue={setMail} />
                }, {
                    id: 'password', formElement: <CoolTextInput id={'password'} value={password} setValue={setPassword} type={TextInputTypeEnum.PASSWORD} />
                }]} id={'loginForm'} nColumns={1}></CoolForm>
                <LoginButton onClick={() => onRegister()} iconType={IconTypeEnum.LOGIN} ></LoginButton>
            </LoginBox>
        </MainBox>
    )
}