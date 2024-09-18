import { IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import React, { forwardRef, useState } from 'react';
import { BiShow, BiHide } from 'react-icons/bi';
import { TbLock } from 'react-icons/tb';

interface PasswordInputProps {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
    onBlur?: () => void;
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
                onBlur={props.onBlur}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />
            <InputRightElement>
                <IconButton type={"button"} variant={'ghost'} style={{ boxShadow: 'none' }} aria-label='show-password'
                    tabIndex={-1} 
                    icon={showPassword ? <BiHide /> : <BiShow />} onClick={() => setShowPassword(oldVal => !oldVal)} />
            </InputRightElement>
        </InputGroup>
    )
});