import React, { useEffect } from 'react';
import { useSnackbar } from '../../hooks/useSnackbar';
import { VilaIcon } from './VilaIcon';
import { ColorsType, stylesVars } from '../../utils/stylesVars';

export function VilaSnackbar() {

    const { visible, text, color, icon, onClose } = useSnackbar()

    useEffect(() => {
        if (visible) {
            setTimeout(() => onClose(), 4000)
        }
    }, [visible])

    return (
        visible ? <div className={`z-50 fixed opacity-0 animate-showSnackbar bottom-10 gap-2 max-w-[350px] text-lightFont-500
            border border-lightFont-500 left-[50px] bg-background-500 rounded-lg flex items-center px-2 py-2`}
            style={color ? { borderColor: stylesVars.colors[color as keyof ColorsType] } : undefined} >
            {icon && <span className='text-2xl' style={color ? { color: stylesVars.colors[color as keyof ColorsType] } : undefined}><VilaIcon type={icon} /></span>}
            <span>{text}</span>
        </div>
            : <></>
    )
}