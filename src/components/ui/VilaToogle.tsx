import React, { SetStateAction } from 'react';

export interface ToogleOption {
    label: JSX.Element | string
    value: number | undefined
}


function ToogleElement({ optionElement, setOption, selected }: { optionElement: ToogleOption, setOption: React.Dispatch<SetStateAction<number | undefined>>, selected?: boolean }) {

    return (
        <div className={`w-full flex justify-center items-center px-3 py-2 cursor-pointer text-center text-lightFont-600  first:rounded-l-md last:rounded-r-md
            ${selected ? 'bg-background-200 text-lightFont-300 ' : 'hover:bg-background-300 '}`} onClick={() => setOption(optionElement.value)
            }>
            {optionElement.label}
        </div >
    )
}

export function VilaToogle({ optionList, option, setOption, vertical = false }: { optionList: ToogleOption[], option: number | undefined, setOption: React.Dispatch<SetStateAction<number | undefined>>, vertical?: boolean }) {

    return (
        <div className={`w-full flex ${vertical && 'flex-col'} bg-background-400 rounded-md`}>
            {optionList.map((optionElement) => <ToogleElement key={`key_${optionElement.value}`} optionElement={optionElement} setOption={setOption} selected={optionElement.value === option} />)}
        </div>
    )
}