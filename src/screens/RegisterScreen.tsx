import { useState, useEffect, useRef } from 'react';
import { useApi } from '../hooks/useApi';
import { emailValidator, minLength8Validator, notEmptyValidator, upperLowerCaseValidator, useValidator } from '../hooks/useValidator';
import { ApiError } from '../types/types';
import StatusCode from 'status-code-enum';
import { useNavigate } from 'react-router-dom';
import { useMisc } from '../hooks/useMisc';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import { Button, Checkbox, FormControl, FormErrorMessage, FormHelperText, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import { BiUser } from 'react-icons/bi';
import { HiOutlineMail } from 'react-icons/hi';
import { TbLock } from 'react-icons/tb';
import { Typography } from '../components/atom/Typography';
import { Link } from '../components/atom/Link';

export function RegisterScreen() {

    const { register } = useApi()
    const navigate = useNavigate()
    const { isLoading, setIsLoading } = useMisc()

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [serviceTermsAccepted, setServiceTermsAccepted] = useState<boolean>(false)

    const [usernameDirty, usernameError, usernameMessage, usernameValidate] = useValidator(username, [notEmptyValidator])
    const [emailDirty, emailError, emailMessage, emailValidate] = useValidator(email, [notEmptyValidator, emailValidator]);
    const [passwordDirty, passwordError, passwordMessage, passwordValidate] = useValidator(password, [notEmptyValidator, minLength8Validator, upperLowerCaseValidator]);
    const [passwordMatchError, setPasswordMatchError] = useState<string>('')
    const [passwordMatchDirty, setPasswordMatchDirty] = useState<boolean>(false)
    const [serviceTermsAcceptedDirty, setServiceTermsAcceptedDirty] = useState<boolean>(false)
    const [serviceTermsAcceptedError, setServiceTermsAcceptedError] = useState<string>('')
    const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState<boolean>(false)


    const toast = useToast()

    const firstRender = useRef(true)

    const disabledButton = isLoading || emailError || passwordError || passwordMatchError !== '' || usernameError || serviceTermsAcceptedError !== ''

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

    const serviceTermsAcceptedValidate = () => {
        if (!firstRender.current) {
            setServiceTermsAcceptedDirty(true)
        }
        if (serviceTermsAccepted) {
            setServiceTermsAcceptedError('')
            return true
        } else {
            setServiceTermsAcceptedError('You must accepte the terms of service')
            return false
        }
    }

    useEffect(() => {
        passwordMatchValidate()
    }, [password, repeatPassword])

    useEffect(() => {
        serviceTermsAcceptedValidate()
    }, [serviceTermsAccepted])

    useEffect(() => {
        firstRender.current = false
    }, [])

    const onRegister = async () => {
        const usernameValid = usernameValidate()
        const emailValid = emailValidate()
        const passwordValid = passwordValidate()
        const passwordMatch = passwordMatchValidate()
        const serviceTermsAccepted = serviceTermsAcceptedValidate()
        if (usernameValid && emailValid && passwordValid && passwordMatch && serviceTermsAccepted) {
            setIsLoading(true)
            try {
                await register({ username, email, password })
                toast({
                    title: 'User succesfully registered',
                    status: 'success',
                    duration: 5000,
                })
                navigate("/login")
            } catch (e) {
                if (e instanceof ApiError) {
                    if (e.cause === StatusCode.ClientErrorConflict) {
                        if (e.errCode === 'user') {
                            toast({
                                title: 'The username is already in use',
                                status: 'error',
                                duration: 5000,
                            })
                        }
                        if (e.errCode === 'mail') {
                            toast({
                                title: 'The email is already in use',
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
                } else {
                    toast({
                        title: 'An internal error has occurred',
                        status: 'error',
                        duration: 5000,
                    })
                }
            } finally {
                setIsLoading(false)
            }
        }
    }

    const termsOfService = `
    **Terms of Service Agreement**
    
    **Effective Date: [Date]**
    
    This Terms of Service Agreement (the "Agreement") is entered into by and between you ("User," "you," or "your") and Workblok ("we," "us," or "our"). This Agreement governs your use of the Workblok mobile application (the "App"). By accessing or using the App, you agree to be bound by this Agreement. If you do not agree to the terms and conditions of this Agreement, do not use the App.
    
    **1. Use of the App**
    
    1.1 **License:** Subject to the terms of this Agreement, the Company grants you a limited, non-exclusive, non-transferable, revocable license to use the App for your personal, non-commercial use.
    
    1.2 **Restrictions:** You may not: (a) decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the App; (b) use the App for any purpose that is illegal or prohibited by this Agreement; (c) exploit any part of the App for commercial purposes without our express consent.
    
    **2. User Accounts**
    
    2.1 **Account Registration:** To use certain features of the App, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
    
    2.2 **Account Information:** Workblok stores only your email address and a username associated with your account. We do not collect additional personal information unless explicitly provided by you.
    
    2.3 **Security:** You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access or use of your account.
    
    **3. Content**
    
    3.1 **User-Generated Content:** You may have the opportunity to submit, post, display, transmit, or otherwise make available content, including but not limited to text, images, and other materials (collectively, "User Content"). You are solely responsible for your User Content.
    
    3.2 **Company Content:** The App may contain content owned or licensed by the Company ("Company Content"). Company Content is protected by copyright, trademark, patent, trade secret, and other laws.
    
    **4. Privacy**
    
    4.1 **Privacy Policy:** Your use of the App is also governed by our Privacy Policy, which outlines how your email address and username are collected, stored, and used. Please review the Privacy Policy to understand our practices concerning the collection and use of your information.
    
    **5. Termination**
    
    5.1 **Termination:** You may terminate your account at any time by discontinuing the use of the App.
    
    **6. Disclaimer of Warranties**
    
    6.1 **No Warranties:** The App is provided "as is" and "as available" without any representations or warranties, express or implied. We do not warrant that the App will be error-free or uninterrupted.
    
    **7. Limitation of Liability**
    
    7.1 **Limitation of Liability:** In no event shall Workblok or its developers be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use or inability to use the App; (b) any unauthorized access to or use of our servers and/or any personal information stored therein.
    
    **8. Governing Law**
    
    8.1 **Governing Law:** This Agreement shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles.
    
    **9. Changes to this Agreement**
    
    9.1 **Modification:** We reserve the right to modify this Agreement at any time. If we make changes to this Agreement, we will post the revised Agreement on the App and update the "Effective Date" above.
    
    By continuing to use the App after the changes become effective, you agree to be bound by the revised Agreement.
    
    **Contact Information:**
    
    If you have any questions about this Agreement or our privacy practices, please contact us at [Your Contact Email].
    
    **By using the App, you signify your acceptance of this Agreement.**
    `;

    return (
        <Layout isPublic>
            <PublicFormLayout title={'Sign up'}>
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

                <FormControl isInvalid={usernameDirty && usernameError}>
                    <InputGroup>
                        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <InputLeftElement
                            pointerEvents='none'
                            color='gray.300'
                            fontSize='1.2em'
                        >
                            <BiUser color='gray.300' />
                        </InputLeftElement>
                    </InputGroup>
                    {usernameDirty && usernameError ?
                        <FormErrorMessage>{usernameMessage}</FormErrorMessage>
                        : <FormHelperText visibility={'hidden'}>{'.'}</FormHelperText>
                    }
                </FormControl>

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
                <FormControl isInvalid={serviceTermsAcceptedDirty && serviceTermsAcceptedError != ''}>
                    <Checkbox onChange={(e) => setServiceTermsAccepted(e.target.checked)}>
                        {'I accept the '}<Link onClick={() => setIsTermsOfServiceOpen(true)}>{'terms of service'}</Link>
                    </Checkbox>
                    {serviceTermsAcceptedDirty && serviceTermsAcceptedError != '' ?
                        <FormErrorMessage>{serviceTermsAcceptedError}</FormErrorMessage>
                        : <FormHelperText visibility={'hidden'}>{'.'}</FormHelperText>
                    }
                </FormControl>
                <Button isLoading={isLoading} isDisabled={disabledButton} onClick={onRegister}>{'Sign up'}</Button>

                <Modal isOpen={isTermsOfServiceOpen} onClose={() => setIsTermsOfServiceOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Typography mode='body'>{termsOfService}</Typography>
                        </ModalBody>
                    </ModalContent>
                </Modal>

            </PublicFormLayout>
        </Layout >
    )
}