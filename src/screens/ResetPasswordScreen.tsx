import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useMisc } from '../hooks/useMisc';
import { useValidator, notEmptyValidator, minLength8Validator, upperLowerCaseValidator } from '../hooks/useValidator';
import { ApiError } from '../types/types';
import StatusCode from 'status-code-enum';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import { Button, FormControl, FormErrorMessage, FormHelperText, Input, InputGroup, InputLeftElement, useToast } from '@chakra-ui/react';
import { BiCheck } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { Typography } from '../components/atom/Typography';
import { Link } from '../components/atom/Link';
import { TbLock } from 'react-icons/tb';


export function ResetPasswordScreen() {

    const navigate = useNavigate()
    const { useVerificationCode, sendVerificationCode } = useApi()
    const [step, setStep] = useState<number>(1)
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const { isLoading, setIsLoading } = useMisc()
    const [passwordDirty, passwordError, passwordMessage, passwordValidate] = useValidator(password, [notEmptyValidator, minLength8Validator, upperLowerCaseValidator]);
    const [passwordMatchError, setPasswordMatchError] = useState<string>('')
    const [passwordMatchDirty, setPasswordMatchDirty] = useState<boolean>(false)
    const [codeError, setCodeError] = useState<string>('')
    const { code, userMail } = useParams();
    const firstRender = useRef(true)


    const toast = useToast()

    const disabledButton = isLoading || passwordError || passwordMatchError !== ''


    const passwordMatchValidate = () => {
        if (!firstRender.current) {
            setPasswordMatchDirty(true)
        }
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

    useEffect(() => {
        firstRender.current = false
    }, [])



    const onValidate = async () => {
        const passwordValid = passwordValidate()
        if (passwordValid) {
            setIsLoading(true)
            try {
                await useVerificationCode({ code: code!, email: userMail!, type: 'recover_password', newPass: password })
            } catch (e) {
                if (e instanceof ApiError) {
                    if (e.cause === StatusCode.ClientErrorNotFound || e.cause === StatusCode.ClientErrorUnauthorized) {
                        setCodeError('The code is not correct')
                    }
                    if (e.cause === StatusCode.ClientErrorGone) {
                        setCodeError('The code has expired')
                    }
                } else {
                    setCodeError('An internal error has occurred')
                }
            } finally {
                setIsLoading(false)
                setStep(2)
            }
        }
    }
    const onSendCode = async () => {
        setIsLoading(true)
        try {
            await sendVerificationCode({ email: userMail!, type: 'recover_password' })
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


    return (
        <Layout isPublic>
            <PublicFormLayout title={'Reset password'}>
                {step === 1 ?
                    <>
                        <FormControl isInvalid={passwordDirty && passwordError}>
                            <InputGroup>
                                <Input placeholder="Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <InputLeftElement
                                    pointerEvents='none'
                                    color='gray.300'
                                    fontSize='1.2em'
                                >
                                    <TbLock color='gray.300' />
                                </InputLeftElement>
                            </InputGroup>
                            {passwordDirty && passwordError ?
                                <FormErrorMessage>{passwordMessage}</FormErrorMessage>
                                : <FormHelperText visibility={'hidden'}>{'.'}</FormHelperText>
                            }
                        </FormControl>
                        <FormControl isInvalid={passwordMatchDirty && passwordMatchError != ''} >
                            <InputGroup>
                                <Input placeholder="Repeat password" type='password' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                                <InputLeftElement
                                    pointerEvents='none'
                                    color='gray.300'
                                    fontSize='1.2em'
                                >
                                    <TbLock color='gray.300' />
                                </InputLeftElement>
                            </InputGroup>
                            {passwordMatchDirty && passwordMatchError != '' ?
                                <FormErrorMessage>{passwordMatchError}</FormErrorMessage>
                                : <FormHelperText visibility={'hidden'}>{'.'}</FormHelperText>
                            }
                        </FormControl>
                        <Button isLoading={isLoading} isDisabled={disabledButton} onClick={() => onValidate()}>{'Change password'}</Button>
                    </>
                    :
                    <>
                        {codeError ?
                            <>
                                <div className='flex gap-2'>
                                    <IoMdClose className='text-3xl text-error' />
                                    <Typography mode='body' className='mb-4'>{codeError}</Typography>
                                </div>
                                <span className='flex'>
                                    <Typography mode='body'>{`Try to ${'\u00A0'}`}</Typography>
                                    <Link onClick={() => onSendCode()}>{' send another code'}</Link>
                                </span>
                            </>
                            :
                            <>
                                <div className='flex gap-2'>
                                    <BiCheck className='text-3xl text-success' />
                                    <Typography mode='body' className='mb-4'>{'Your password has been changed'}</Typography>
                                </div>
                                <span className='flex'>
                                    <Typography mode='body'>{`Now you can${'\u00A0'}`}</Typography>
                                    <Link onClick={() => navigate('/login')}>{' sign in'}</Link>
                                </span>
                            </>}
                    </>
                }
            </PublicFormLayout >
        </Layout >
    )
}