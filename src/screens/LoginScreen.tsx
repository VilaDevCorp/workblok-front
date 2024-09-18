import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useMisc } from '../hooks/useMisc';
import { useValidator, notEmptyValidator } from '../hooks/useValidator';
import { ApiError } from '../types/types';
import StatusCode from 'status-code-enum';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import { FormControl, InputGroup, Input, InputLeftElement, FormErrorMessage, FormHelperText, Checkbox, Button, useToast } from '@chakra-ui/react';
import { HiOutlineMail } from 'react-icons/hi';
import { TbLock } from 'react-icons/tb';
import { Typography } from '../components/atom/Typography';
import { Link } from '../components/atom/Link';
import { IoMdClose } from 'react-icons/io';
import { useApi } from '../hooks/useApi';
import { PasswordInput } from '../components/atom/PasswordInput';


export function LoginScreen() {

    const auth = useAuth()
    const navigate = useNavigate()
    const { sendVerificationCode } = useApi()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const [notValidatedAccount, setNotValidatedAccount] = useState<boolean>(false)

    const { isLoading, setIsLoading, triggerReloadUserInfo } = useMisc()

    const [emailDirty, emailError, emailMessage, emailValidate] = useValidator(email, [notEmptyValidator]);
    const [passwordDirty, passwordError, passwordMessage, passwordValidate] = useValidator(password, [notEmptyValidator]);

    const toast = useToast()

    const onResendCode = async () => {
        setIsLoading(true)
        try {
            await sendVerificationCode({ email, type: 'validate_account' })
            toast({
                title: 'The code was succesfully sent!',
                status: 'success',
                duration: 5000,
            })
        } catch (e) {
            toast({
                title: 'There was an error sending the new code. Try again',
                status: 'error',
                duration: 5000,
            })
        } finally {
            setIsLoading(false)
        }
    }

    const disabledButton = isLoading || emailError || passwordError

    const onLogin = async () => {
        const emailValid = emailValidate()
        const passwordValid = passwordValidate()

        if (emailValid && passwordValid) {
            setIsLoading(true)
            try {
                await auth.authenticate(email, password, rememberMe)
                triggerReloadUserInfo()
                navigate('/')
            } catch (e) {
                setIsLoading(false)
                if (e instanceof ApiError) {
                    if (e.cause === StatusCode.ClientErrorUnauthorized && e.errCode === '002') {
                        setNotValidatedAccount(true)
                    }
                    if (e.cause === StatusCode.ClientErrorUnauthorized && e.errCode === '001' || e.cause === StatusCode.ClientErrorNotFound) {
                        toast({
                            title: 'Wrong credentials',
                            status: 'error',
                            duration: 5000,
                        })
                    }
                } else {
                    toast({
                        title: 'An internal error has occurred',
                        status: 'error',
                        duration: 5000,
                    })
                }
            }
            setIsLoading(false)
        }
    }

    return (
        <Layout isPublic>
            <PublicFormLayout title={'Sign in'} onSubmit={onLogin}>
                {!notValidatedAccount ?
                    <>
                        <FormControl isInvalid={emailDirty && emailError}>
                            <InputGroup>
                                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <InputLeftElement
                                    pointerEvents='none'
                                    color='gray.300'
                                    fontSize='1.2em'
                                >
                                    <HiOutlineMail color='gray.300' />
                                </InputLeftElement>
                            </InputGroup>
                            {emailError && emailDirty ?
                                <FormErrorMessage>{emailMessage}</FormErrorMessage>
                                : <FormHelperText visibility={'hidden'}>{'.'}</FormHelperText>
                            }
                        </FormControl>

                        <FormControl isInvalid={passwordDirty && passwordError}>
                            <PasswordInput password={password} setPassword={setPassword} placeholder='Password' />
                            {passwordDirty && passwordError ?
                                <FormErrorMessage>{passwordMessage}</FormErrorMessage>
                                : <FormHelperText visibility={'hidden'}>{'.'}</FormHelperText>
                            }
                        </FormControl>
                        <FormControl>
                            <Checkbox onChange={(e) => setRememberMe(e.target.checked)}>
                                {'Remember me'}
                            </Checkbox>
                            <FormHelperText visibility={'hidden'}>{'.'}</FormHelperText>
                        </FormControl>
                        <Button type='submit' isLoading={isLoading} isDisabled={disabledButton}>{'Sign in'}</Button>
                        <Link className='mt-2' onClick={() => navigate("/recover-password")}>{'I have forgotten my password'}</Link>
                        <span className='flex mt-5'>
                            <Typography>{`New here? ${'\u00A0'}`}</Typography><Link onClick={() => navigate("/register")}>{'Sign up'}</Link>
                        </span>
                    </>
                    :
                    <>

                        <div className='flex gap-2'>
                            <IoMdClose className='text-3xl text-error' />
                            <Typography mode='body' className='mb-4'>{'Your account has not been validated'}</Typography>
                        </div>
                        <Typography mode='body' className='mb-4'>{`In order to validate the account you should follow the instructions we sent you via email`}</Typography>

                        <span >
                            <Typography mode='body'>{`You can't see the email? Try to ${'\u00A0'}`}</Typography>
                            <Link onClick={() => onResendCode()}>{' send another code'}</Link>
                        </span>
                    </>}
            </PublicFormLayout>

        </Layout >
    )
}