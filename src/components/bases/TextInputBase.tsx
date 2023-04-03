import styled from 'styled-components';
import { SelectOption } from '../../types/types';

const InputStyled = styled.input`
`;

export enum TextInputTypeEnum {
    TEXT = "text", PASSWORD = "password"
}
export function TextInputBase({ value, setValue, className, type = TextInputTypeEnum.TEXT, disabled }: {
    className?: string, value: string, setValue: (value: string) => void, type?: TextInputTypeEnum, disabled?: boolean
}) {

    return (
        <InputStyled type={type} disabled={disabled} className={className} value={value} onChange={(e) => setValue(e.target.value)} />
    )
}