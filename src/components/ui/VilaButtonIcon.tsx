import React, { MouseEventHandler } from 'react';
import { IconType, VilaIcon } from './VilaIcon';

const buildClasses = (props: Props) => {
    let resultClasses = ''
    const baseClasses = ' flex gap-2 items-center px-1 py-1 rounded-full border-2 border-transparent text-lightFont-500 ' +
        'enabled:hover:brightness-125 enabled:active:scale-105 transition-transform justify-center aspect-square '

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

    switch (props.size) {
        case 'l':
            resultClasses = resultClasses.concat('text-4xl ')
            break
        case 'm':
            resultClasses = resultClasses.concat('text-3xl ')
            break
        case 's':
            resultClasses = resultClasses.concat('text-2xl ')
            break
        case 'xs':
            resultClasses = resultClasses.concat('text-1xl ')
            break
    }
    if (props.font === 'darkFont') {
        resultClasses = resultClasses.concat('!text-darkFont-500 ')
    }

    if (props.style !== 'transparent') {
        resultClasses = resultClasses.concat(props.style === 'filled' ? `bg-${props.color}-500` : `!border-${props.color}-500 `)
    }

    if (props.disabled) {
        resultClasses = resultClasses.concat(' brightness-50 ')
    }
    return resultClasses
}

type Props = React.ComponentPropsWithoutRef<'button'> & {
    size?: 'xs' | 's' | 'm' | 'l' | 'xl'
    color?: string
    font?: 'lightFont' | 'darkFont'
    style?: 'filled' | 'outlined' | 'transparent'
    icon: IconType
}


export function VilaButtonIcon({ size = 'm', color = 'primary', font = 'lightFont', style = 'filled', ...props }: Props) {
    const nativeProps = { ...props as React.ComponentPropsWithoutRef<'button'> };
    return (
        <button {...nativeProps} className={`${buildClasses({ size, color, font, style, ...props })} ${props.className ? props.className : ''}`} onClick={props.onClick}>
            <VilaIcon type={props.icon} />
        </button>
    )
}