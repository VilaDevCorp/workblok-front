import styled from 'styled-components';
import { SelectOption, SizeEnum } from '../../types/types';
import { SelectBase } from './../bases/SelectBase';


interface AllProps {
    disabled?: boolean
}


const CoolStyledSelect = styled(SelectBase) <AllProps>`
    padding: 14px 24px;
    border-radius: 14px;
    font-size: ${props => props.theme.fontSize.regularText};
    width: 100%;
    min-height: 46px;
    height: 46px;
    background-color: ${props => props.disabled ? props.theme.color.main.l4 : props.theme.color.main.l6} ;
    color: ${props => props.theme.color.main.d7};
    border: none;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    border: 2px solid transparent;
    outline:none;
    &:focus {
        border: 2px solid ${props => props.disabled ? undefined : props.theme.color.main.n};
        background-color: ${props => props.disabled ? undefined : props.theme.color.main.l5} ;
        transition: border .2s;
    }
    transition: background .2s;
    &:hover {
        transition: background .2s;
        background-color: ${props => props.disabled ? undefined : props.theme.color.main.l5} ;
    }   
`;

export function CoolSelect({ id, options, value, setValue, noEmpty, disabled }: {
    id: string, options: SelectOption[], value: string, setValue: (value: string) => void,
    noEmpty?: boolean, disabled?: boolean
}) {

    return (
        <CoolStyledSelect options={options} setValue={setValue} value={value}
            noEmpty={noEmpty} disabled={disabled} />
    )
}