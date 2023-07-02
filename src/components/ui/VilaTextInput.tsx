import { useState } from "react"
import { IconType, VilaIcon } from "./VilaIcon"

export type TextInputType = 'text' | 'password'

export type Props = {
    value: string
    setValue: (value: string) => void
    icon?: IconType
    iconAlignment?: 'left' | 'right'
    type?: TextInputType
    disabled?: boolean
    errorMsg?:string
}

export function VilaTextInput({ type = 'text', disabled = false, ...props }: Props) {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className="flex flex-col gap-2">
            <div className={`flex gap-2 items-center px-3 h-[50px] py-3 border border-transparent bg-background-300 rounded-lg text-lightFont-500 ${isFocused ? ' bg-background-400 !border-primary-500 ' : ''} ${disabled ? 'brightness-50 ' : 'hover:bg-background-400 '}`} >
                {props.icon && props.iconAlignment !== 'right' && <VilaIcon type={props.icon} />}
                <input className="bg-transparent focus:outline-none w-full" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onChange={(e) => props.setValue(e.target.value)} value={props.value} type={type} disabled={disabled} />
                {props.icon && props.iconAlignment === 'right' && <VilaIcon type={props.icon} />}
            </div>
            <p className="text-error h-[14px]">{props.errorMsg}</p>
        </div>
    )
}