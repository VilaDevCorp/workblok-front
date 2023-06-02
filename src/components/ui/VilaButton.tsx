import React, { MouseEventHandler } from 'react';
import { IconType, VilaIcon } from './VilaIcon';

const buildClasses = (props: Props) => {
    let resultClasses = ''
    const baseClasses = ' flex gap-2 items-center px-5 py-3 rounded-lg border-2 border-transparent text-lightFont-500 ' +
        'enabled:hover:brightness-125 enabled:active:scale-105 transition-transform '

    switch (props.style) {
        case 'filled':
            resultClasses = baseClasses.concat(` `)
            break;
        case 'outlined':
            resultClasses = baseClasses.concat(` `)
            break;
        case 'transparent':
            resultClasses = baseClasses.concat('!border-transparent ')
            break;
    }
    if (props.disabled) {
        resultClasses = resultClasses.concat('brightness-50 ')
    }
    if (props.font === 'darkFont') {
        resultClasses = resultClasses.concat('!text-darkFont-500 ')
    }
    if (props.style !== 'transparent') {
        resultClasses = resultClasses.concat(props.style === 'filled' ? `bg-${props.color}-500` : `!border-${props.color}-500 `)
    }


    return resultClasses
}

type Props = React.ComponentPropsWithoutRef<'button'> & {
    color?: string
    font?: 'lightFont' | 'darkFont'
    style?: 'filled' | 'outlined' | 'transparent'
    icon?: IconType
    iconAlignment?: 'left' | 'right'
    tooltip?: string
}

export function VilaButton({ color = 'primary', font = 'darkFont', style = 'filled', ...props }: Props) {
    const nativeProps = { ...props as React.ComponentPropsWithoutRef<'button'> }
    const { className, ...nativePropsWithoutClass } = nativeProps
    return (
        <button {...nativePropsWithoutClass} title={props.tooltip} className={props.className + buildClasses({ style, color, font, ...props })}>
            {props.icon && props.iconAlignment !== 'right' && <VilaIcon type={props.icon} />}
            <>
                {props.children}
            </>
            {props.icon && props.iconAlignment === 'right' && <VilaIcon type={props.icon} />}
        </button>
    )
}