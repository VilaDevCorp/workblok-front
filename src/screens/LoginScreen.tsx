import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';
import loginImg from './../../public/loginImg.png';
import { useMisc } from '../hooks/useMisc';
import { VilaForm } from '../components/ui/VilaForm'
import { VilaTextInput } from '../components/ui/VilaTextInput';
import { VilaButton } from '../components/ui/VilaButton';
import logo from './../../public/logo.svg';


export function LoginScreen() {

    const auth = useAuth()
    const navigate = useNavigate()
    const theme = useTheme()
    const [mail, setMail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showScreen, setShowScreen] = useState<boolean>(true)
    const [isHidden, setIsHidden] = useState<boolean>(false)
    const { triggerReloadUserInfo } = useMisc()



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
    }, [auth.csrfToken])


    const onLogin = async () => {
        if (mail !== '' && password !== '') {
            setIsLoading(true)
            try {
                await auth.authenticate(mail, password)
                triggerReloadUserInfo()
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
            <div className={`flex absolute top-0 bg-background-500 z-50 w-full h-full justify-center items-center transition-opacity ${isHidden ? ' opacity-0' : ''}`}>
                <div className={`flex w-500px] h-full justify-center items-center flex-col gap-6 `}>
                    <img src={logo} className='w-[150px] h-[150px]' alt='Logo login' />
                    <VilaForm fields={[{ input: <VilaTextInput value={mail} setValue={setMail} />, label: 'Email' },
                    { input: <VilaTextInput value={password} setValue={setPassword} type='password' />, label: 'Contraseña' }]} nColumns={1}></VilaForm>
                    <VilaButton onClick={() => onLogin()} icon={'login'} font='lightFont' >{'Acceder'}</VilaButton>
                </div>
            </div >
            : <></>
    )
}