import { useEffect, useRef, useState } from 'react';
import { useMisc } from '../../hooks/useMisc';
import { IconType, VilaIcon } from './VilaIcon';
import { useClickOutsideContext } from '../../hooks/useClickOutsideContext';


export interface ContextMenuPosition {
    top: number;
    left: number;
    visible: boolean;
    invertedX?: boolean;
    invertedY?: boolean;
    nOptions?: number;
}

export interface ContextOption {
    icon: IconType;
    label: string;
    isMulti?: boolean;
    disableCondition?: (element: unknown) => boolean
    onClick: (selectedElements: unknown[]) => unknown;
}

function VilaContextOption({ label, icon, disabled, onClick }: { label: string, icon: IconType, disabled?: boolean, onClick: () => void }) {
    const { triggerClearContext } = useMisc()

    return (
        <div id={`context_option_${label}`} className={`flex gap-3 h-[46px] items-center px-2 py-2 cursor-default first:rounded-t-lg last:rounded-b-lg ${disabled ? ' brightness-50 ' : 'hover:bg-background-400 hover:text-lightFont-400'}`}
            onClick={disabled ? () => false : () => { triggerClearContext(); onClick(); }}>
            <span><VilaIcon type={icon} /></span>
            <span>{label}</span>
        </div>
    )
}

type Props = {
    visible: boolean
    top: number
    left: number
    invertedX?: boolean
    invertedY?: boolean
    options: ContextOption[]
    selectedElements: unknown[]
    tableBodyRef: React.MutableRefObject<HTMLElement | null>
}


export function VilaContextMenu(props: Props) {

    const contextRef = useRef<HTMLDivElement | null>(null);
    const { triggerClearContext } = useMisc()
    useClickOutsideContext(props.tableBodyRef, contextRef, () => triggerClearContext())

    return (
        <div ref={contextRef} id='table_menu_context' style={{
            top: `${props.top - (props.invertedY && props.options.length ? 46 * props.options.length : 0)}px`,
            left: `${props.left - (props.invertedX && contextRef.current?.clientWidth ? contextRef.current?.clientWidth : 0)}px`
        }}
            className={`flex flex-col rounded-lg absolute z-10 bg-background-600 text-lightFont-500 ${props.visible ? '' : ' invisible'}`}>
            {props.options.map((option, index) => {
                const condition = option.disableCondition
                const isDisabled = condition && props.selectedElements.find((element) => condition(element)) !== undefined
                return < VilaContextOption key={`context_option_${index}`
                } icon={option.icon} disabled={(props.selectedElements.length > 1 && !option.isMulti) || isDisabled}
                    onClick={() => option.onClick(props.selectedElements)} label={option.label}></VilaContextOption>
            })
            }
        </div >

    )
}

