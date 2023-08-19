import { SetStateAction } from "react";
import { VilaButtonIcon } from "../ui/VilaButtonIcon";

export function YearSelector({ value, setValue }: { value: number | undefined, setValue: React.Dispatch<SetStateAction<number | undefined>> }) {

    return (
        <div className='flex gap-2 items-center justify-between'>
            <VilaButtonIcon size="xs" icon="previous" onClick={() => setValue((old) => old ? old - 1 : undefined)} />
            <span className="text-xl text-lightFont-600">{value}</span>
            <VilaButtonIcon size="xs" icon="next" onClick={() => setValue((old) => old ? old + 1 : undefined)} />
        </div>
    )
}