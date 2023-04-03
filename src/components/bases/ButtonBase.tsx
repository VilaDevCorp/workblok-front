import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
overflow: hidden;
`;

export function ButtonBase({ onClick, className, children, disabled }: {
    onClick?: MouseEventHandler<HTMLButtonElement>, className?: string, children?: JSX.Element | JSX.Element[], disabled?: boolean
}) {

    return (
        <ButtonStyled className={className} onClick={onClick} disabled={disabled}>{children}</ButtonStyled>
    )
}