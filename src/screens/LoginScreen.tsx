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
import { useValidator, notEmptyValidator, emailValidator, minLength8Validator, upperLowerCaseValidator } from '../hooks/useValidator';
import { ApiError } from '../types/types';
import StatusCode from 'status-code-enum';
import { VilaLayout } from '../components/ui/VilaLayout';


export function LoginScreen() {

    const auth = useAuth()
    const navigate = useNavigate()
    const theme = useTheme()
    const [mail, setMail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { triggerReloadUserInfo } = useMisc()

    const [mailDirty, mailError, mailMessage, mailValidate] = useValidator(mail, [notEmptyValidator]);
    const [passwordDirty, passwordError, passwordMessage, passwordValidate] = useValidator(password, [notEmptyValidator]);


    const onLogin = async () => {
        const mailValid = mailValidate()
        const passwordValid = passwordValidate()

        if (mailValid && passwordValid) {
            setIsLoading(true)
            try {
                await auth.authenticate(mail, password)
                triggerReloadUserInfo()
                navigate('/')
            } catch (e) {
                setIsLoading(false)
                if (e instanceof ApiError) {
                    if (e.cause === StatusCode.ClientErrorUnauthorized && e.errCode === '002') {
                        navigate(`/validate/${mail}`)
                    }
                }
            }
            setIsLoading(false)
        }
    }

    const linkClasses = 'text-secondary-100  self-start cursor-pointer hover:text-secondary-400'

    return (
        <VilaLayout isPublic>
            <div className={`flex w-full h-full justify-center items-center`}>
                <div className={`flex w-[500px] h-full justify-center items-center flex-col gap-6 `}>
                    <img src={logo} className='w-[150px] h-[150px]' alt='Logo login' />
                    <VilaForm fields={[{ input: <VilaTextInput value={mail} setValue={setMail} errorMsg={mailDirty ? mailMessage : ''} />, label: 'Email' },
                    { input: <VilaTextInput value={password} setValue={setPassword} type='password' errorMsg={passwordDirty ? passwordMessage : ''} />, label: 'Contraseña' }]} nColumns={1}></VilaForm>
                    <a className={linkClasses} onClick={() => navigate("/recover-password")}>{'I have forgotten my password'}</a>
                    <VilaButton className='!w-full !justify-center' onClick={() => onLogin()} icon={'login'} font='lightFont' >{'Login'}</VilaButton>
                    <span className='text-lightFont-700 w-full justify-center gap-4 flex' >{"You don't have an account? "}<a className={linkClasses} onClick={() => navigate("/register")}>{'Sign up'}</a></span>
                </div>
            </div >
        </VilaLayout>
    )
}