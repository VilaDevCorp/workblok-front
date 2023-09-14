import { useState } from "react"
import { IconType, VilaIcon } from "./VilaIcon"

export type TextInputType = 'text' | 'password'

export type Props = {
    value: string
    setValue: (value: string) => void
    type?: TextInputType
    disabled?: boolean
    maxChars?: number
}

export function VilaTextArea({ disabled = false, ...props }: Props) {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className={`flex gap-2 items-center px-3 py-3 border border-transparent bg-background-300 rounded-lg text-lightFont-500 ${isFocused ? ' bg-background-400 !border-primary-500 ' : ''} ${disabled ? 'brightness-50 ' : 'hover:bg-background-400 '}`} >
            <textarea className="bg-transparent resize-none focus:outline-none w-full h-[100px]" onFocus={() => setIsFocused(true)} maxLength={props.maxChars} onBlur={() => setIsFocused(false)} onChange={(e) => props.setValue(e.target.value)} value={props.value} disabled={disabled} />
        </div>
    )
}