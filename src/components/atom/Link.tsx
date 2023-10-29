import React from 'react';
import { Link as ChakraLink } from '@chakra-ui/react';

export function Link({ children, href, onClick, className }: { children: React.ReactNode, href?: string, onClick?: () => void, className?: string }) {

    return (
        <ChakraLink className={className} href={href} onClick={onClick} color={'blue.500'} >
            {children}
        </ChakraLink>
    )
}