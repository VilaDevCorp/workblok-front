import { useState } from "react"
import { IconType, VilaIcon } from "./VilaIcon"

export type Props = {
    label: string
    value: boolean
    setValue: (value: boolean) => void
    disabled?: boolean
}

export function VilaCheckbox({ disabled = false, ...props }: Props) {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <div className="flex flex-col gap-2 flex-grow">
            <div className={`flex gap-2 items-center px-3 h-[50px] py-3 border border-transparent rounded-lg text-lightFont-500 ${isFocused ? ' backdrop-brightness-150 ' : ''} 
                ${disabled ? 'brightness-50 ' : 'hover:brightness-150 '}`} >
                <label className="flex gap-2 w-full items-center">
                    <span className={`w-[25px] h-[25px] border-2 border-background-300 rounded-lg ${props.value && 'bg-background-300'}`}>
                        {props.value && <VilaIcon type="check" />}
                    </span>
                    <input type='checkbox' className="bg-transparent hidden focus:outline-none" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
                        onChange={(e) => props.setValue(e.target.checked)}
                        checked={props.value} disabled={disabled} />
                    <span className="w-full">{props.label}</span>
                </label>
            </div>
        </div>
    )
}