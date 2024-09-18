import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useMisc } from '../hooks/useMisc';
import { ApiError } from '../types/types';
import StatusCode from 'status-code-enum';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import { Spinner, useToast } from '@chakra-ui/react';
import { Typography } from '../components/atom/Typography';
import { BiCheck } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { Link } from '../components/atom/Link';


export function ValidateAccountScreen() {

    const navigate = useNavigate()
    const { useVerificationCode, sendVerificationCode } = useApi()
    const [step, setStep] = useState<number>(1)
    const { code, userMail } = useParams();
    const [codeError, setCodeError] = useState<string>('')

    const { isLoading, setIsLoading } = useMisc()
    const toast = useToast()

    useEffect(() => {
        onValidate()
    }, [])


    const onValidate = async () => {
        setIsLoading(true)
        try {
            await useVerificationCode({ code: code!, email: userMail!, type: 'validate_account' })
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
            setStep(2)
            setIsLoading(false)
        }

    }
    const onResendCode = async () => {
        setIsLoading(true)
        try {
            await sendVerificationCode({ email: userMail!, type: 'validate_account' })
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
            <PublicFormLayout title={'Email validation'} onSubmit={() => false}>
                {step === 1 ?
                    <div className='ml-auto mr-auto mt-2 flex flex-col items-center gap-4'>
                        <Spinner speed='.8s' size={'xl'} color='blue.500' />
                        <Typography mode='body' className='mb-4'>{'Validating...'}</Typography>
                    </div>
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
                                    <Link onClick={() => onResendCode()}>{' send another code'}</Link>
                                </span>
                            </>
                            :
                            <>
                                <div className='flex gap-2'>
                                    <BiCheck className='text-3xl text-success' />
                                    <Typography mode='body' className='mb-4'>{'Your email has been validated'}</Typography>
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