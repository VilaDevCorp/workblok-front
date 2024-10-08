import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { useMisc } from '../hooks/useMisc';
import { useValidator, notEmptyValidator, minLength8Validator, upperLowerCaseValidator, emailValidator } from '../hooks/useValidator';
import { ApiError } from '../types/types';
import StatusCode from 'status-code-enum';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import { Button, FormControl, FormErrorMessage, FormHelperText, Input, InputGroup, InputLeftElement, useToast } from '@chakra-ui/react';
import { HiOutlineMail } from 'react-icons/hi';


export function ForgottenPasswordScreen() {

    const navigate = useNavigate()
    const { forgottenPassword, resetPassword } = useApi()

    const [email, setEmail] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [emailDirty, emailError, emailMessage, emailValidate] = useValidator(email, [notEmptyValidator, emailValidator]);


    const toast = useToast()

    const disabledButton = isLoading || email === ''


    const onSendCode = async () => {
        setIsLoading(true)
        try {
            await forgottenPassword(email)
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
            <PublicFormLayout title={'Reset password'} onSubmit={onSendCode}>
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
                <Button type='submit' isLoading={isLoading} isDisabled={disabledButton}>{'Reset password'}</Button>

            </PublicFormLayout >
        </Layout >
    )
}