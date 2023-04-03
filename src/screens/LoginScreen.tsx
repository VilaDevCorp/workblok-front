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
import { useMisc } from '../hooks/useMisc';

const MainBox = styled.div`
    display: flex;
    position:absolute;
    top: 0;
    background: ${props => props.theme.color.main.n};
    box-sizing: border-box;
    z-index: 100;
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

    const { logout, fakeDelay } = useApi()
    const auth = useAuth()
    const navigate = useNavigate()
    const theme = useTheme()

    const renderNum = useRef<number>(0)

    const [mail, setMail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showScreen, setShowScreen] = useState<boolean>(false)
    const [isHidden, setIsHidden] = useState<boolean>(false)
    const { setReloadUserInfoFlag } = useMisc()



    useEffect(() => {
        if (auth.csrfToken) {
            setIsHidden(true)
            setTimeout(() => {
                setShowScreen(false)
            }, 2000);
        } else {
            setShowScreen(true)
            setTimeout(() => {
                setIsHidden(false)
            }, 5);

        }

        // if (renderNum.current === 0) {
        //     renderNum.current = ++renderNum.current
        // } else {
        //     if (isHidden) {
        //         setTimeout(() => {
        //             setShowScreen(false)
        //         }, 2000);
        //     }
        // }

    }, [auth.csrfToken])


    const onLogin = async () => {
        if (mail !== '' && password !== '') {
            setIsLoading(true)
            try {
                await auth.authenticate(mail, password)
                setReloadUserInfoFlag((old) => !old)
                navigate('/')
                setIsHidden(true)
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
                    <CoolForm formFields={[{
                        id: 'mail', formElement: <CoolTextInput id={'mail'} value={mail} setValue={setMail} />
                    }, {
                        id: 'password', formElement: <CoolTextInput id={'password'} value={password} setValue={setPassword} type={TextInputTypeEnum.PASSWORD} />
                    }]} id={'loginForm'} nColumns={1}></CoolForm>
                    <LoginButton onClick={() => onLogin()} iconType={IconTypeEnum.LOGIN} ></LoginButton>
                </LoginBox>
            </MainBox>
            : <></>
    )
}