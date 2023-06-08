import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';
import { VilaForm } from '../components/ui/VilaForm'
import { VilaTextInput } from '../components/ui/VilaTextInput';
import { VilaButton } from '../components/ui/VilaButton';
import logo from './../../public/logo.svg';
import { emailValidator, minLength8Validator, notEmptyValidator, upperLowerCaseValidator, useValidator } from '../hooks/useValidator';
import { VilaLayout } from '../components/ui/VilaLayout';


export function RegisterScreen() {

    const { register } = useApi()
    const authInfo = useAuth()
    const navigate = useNavigate()
    const theme = useTheme()

    const [username, setUsername] = useState<string>('')
    const [mail, setMail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [usernameDirty, usernameError, usernameMessage, usernameValidate] = useValidator(username, [notEmptyValidator])
    const [mailDirty, mailError, mailMessage, mailValidate] = useValidator(mail, [notEmptyValidator, emailValidator]);
    const [passwordDirty, passwordError, passwordMessage, passwordValidate] = useValidator(password, [notEmptyValidator, minLength8Validator, upperLowerCaseValidator]);
    const [passwordMatchError, setPasswordMatchError] = useState<string>('')

    const passwordMatchValidate = () => {
        if (password === repeatPassword) {
            setPasswordMatchError('')
            return true
        } else {
            setPasswordMatchError('The passwords do not match')
            return false
        }
    }

    useEffect(() => {
        passwordMatchValidate()
    }, [password, repeatPassword])


    const onRegister = async () => {
        const usernameValid = usernameValidate()
        const mailValid = mailValidate()
        const passwordValid = passwordValidate()
        const passwordMatch = passwordMatchValidate()
        if (usernameValid && mailValid && passwordValid && passwordMatch) {
            setIsLoading(true)
            try {
                await register({ username, mail, password })
            } catch (e) {
                setIsLoading(false)
            }
            setIsLoading(false)
            // }
        }
    }

    return (
        <VilaLayout isPublic>
            <div className={`flex absolute top-0 bg-background-500 z-50 w-full h-full justify-center items-center`}>
                <div className={`flex w-[800px] h-full justify-center items-center flex-col gap-6 `}>
                    <img src={logo} className='w-[150px] h-[150px]' alt='Logo login' />
                    <VilaForm fields={
                        [{ input: <VilaTextInput value={username} setValue={setUsername} errorMsg={usernameDirty ? usernameMessage : ''} />, label: 'Username' },
                        { input: <VilaTextInput value={mail} setValue={setMail} errorMsg={mailDirty ? mailMessage : ''} />, label: 'Mail' },
                        { input: <VilaTextInput value={password} setValue={setPassword} type='password' errorMsg={passwordDirty ? passwordMessage : ''} />, label: 'Password' },
                        { input: <VilaTextInput value={repeatPassword} setValue={setRepeatPassword} type='password' errorMsg={passwordMatchError} />, label: 'Repeat password' }
                        ]} nColumns={2}></VilaForm>
                    <VilaButton className='' onClick={onRegister} font='lightFont' >{'Sign up'}</VilaButton>
                </div>
            </div >
        </VilaLayout>
    )
}