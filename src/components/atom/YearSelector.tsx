import { SetStateAction } from "react";
import { VilaButtonIcon } from "../ui/VilaButtonIcon";

export function YearSelector({ value, setValue }: { value: number | undefined, setValue: (value: number | undefined) => void }) {

    return (
        <div className='flex gap-2 items-center justify-between'>
            <VilaButtonIcon size="xs" icon="previous" onClick={() => setValue(value ? value - 1 : undefined)} />
            <span className="text-xl text-lightFont-600">{value}</span>
            <VilaButtonIcon size="xs" icon="next" onClick={() => setValue(value ? value + 1 : undefined)} />
        </div>
    )
}