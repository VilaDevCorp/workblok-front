import { IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import React, { forwardRef, useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import { TbLock } from 'react-icons/tb';

interface PasswordInputProps {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(props, ref) {

    const { password, setPassword, placeholder } = props;
    const [showPassword, setShowPassword] = useState(false)

    return (
        <InputGroup>
            <InputLeftElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
            >
                <TbLock color='gray.300' />
            </InputLeftElement>
            <Input
                ref={ref}
                placeholder={placeholder}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />
            <InputRightElement>
                <IconButton variant={'ghost'} style={{ boxShadow: 'none' }} aria-label='show-password'
                    icon={showPassword ? <BiHide /> : <BiShow />} onClick={() => setShowPassword(oldVal => !oldVal)} />
            </InputRightElement>
        </InputGroup>
    )
});