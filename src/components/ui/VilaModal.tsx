import { ReactNode, useEffect, useState } from 'react';
import { VilaButtonIcon } from './VilaButtonIcon';


export type ModalSize = 'xs' | 's' | 'm-longer' | 'm-squared' | 'm-fluid-h' | 'l' | 'xl'

const getSize = (size?: ModalSize): string => {
    switch (size) {
        case 'l':
            return 'w-11/12 h-[95%] max-h-[1000px] max-w-2000'
        case 'm-longer':
            return 'w-2/5 h-5/6 max-h-[800px] max-w-[600px]'
        case 'm-fluid-h':
            return 'w-2/5 max-h-[800px] max-w-[600px]'
        case 'm-squared':
            return 'w-3/4 h-3/4 max-h-[450px] max-w-[600px]'
        case 's':
            return 'w-1/2 h-1/2 max-h-600 max-w-1200'
        case 'xs':
            return 'w-2/5 h-2/5 max-h-300 max-w-600'
        default:
            return 'w-3/4 h-3/4 max-h-800 max-w-1600'
    }
}

type Props = {
    children: ReactNode
    size?: ModalSize
    hasHeader?: boolean
    onClose: () => void
    title?: string
    buttons?: JSX.Element[]
}

export function VilaModal(props: Props) {

    const closeWhenEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            props.onClose()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', closeWhenEscape)
        return () => {
            window.removeEventListener('keydown', closeWhenEscape)
        }
    }, [])

    return (
        <div className="w-full top-0 left-0 h-screen backdrop-blur-sm flex z-40 max-h-screen justify-center items-center fixed backdrop-contrast-75 " onClick={() => props.onClose()}>
            <div className={`relative flex rounded-lg flex-col px-3 py-3 bg-background-900 ${getSize(props.size)} `} onClick={(e) => e.stopPropagation()}>
                {props.hasHeader &&
                    <div className='flex w-full justify-between flex-row ml-auto items-center text-lightFont-500'>
                        {props.title}
                        <span className='ml-auto'><VilaButtonIcon size={'s'} style={'transparent'} font='lightFont' icon='close' onClick={() => props.onClose()} />
                        </span>
                    </div>}
                <div className='overflow-y-auto mt-4 mb-4'>
                    {props.children}
                </div>
                <div className='self-end mt-auto flex gap-3 '>
                    {props.buttons?.map((button) =>
                        button
                    )}
                </div>
            </div>
        </div >
    )
}