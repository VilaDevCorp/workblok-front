import { useState } from "react";

export interface SelectOption {
    label: string;
    value: string;
}

type Props = {
    options: SelectOption[]
    value: string
    setValue: (value: string) => void
    emptyLabel: string
    noEmpty?: boolean
    disabled?: boolean
}

export function VilaSelect({ noEmpty = false, disabled = false, ...props }: Props) {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <select className={`outline-none rounded-lg h-[50px] text-lightFont-500 py-3 px-3 bg-background-300 
            border border-transparent ${isFocused ? ' bg-background-400 !border-primary-500 ' : ''} 
            ${disabled ? 'brightness-50 ' : 'hover:bg-background-400 '}`}
            onChange={(e) => props.setValue(e.target.value)} value={props.value} disabled={disabled}
            onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} >
            {!noEmpty && <option value={""}>{props.emptyLabel}</option>}
            {props.options.map((option) => <option value={option.value}>{option.label}</option>)}
        </select>
    )
}