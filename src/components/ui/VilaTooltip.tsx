import React, { useRef, useState } from 'react';
import { VilaIcon } from './VilaIcon';
import { useScreen } from '../../hooks/useScreen';

export function VilaTooltip({ message }: { message: string }) {

    const [visible, setVisible] = useState(false)
    const [invertedX, setInvertedX] = useState(false)
    const [invertedY, setInvertedY] = useState(false)
    const tooltilRef = useRef<HTMLSpanElement>(null)
    const { screenWidth, screenHeight } = useScreen()

    const showTooltip = () => {
        if (tooltilRef.current !== null) {
            const rect = tooltilRef.current.getBoundingClientRect()
            console.log(screenWidth)
            if (rect.left > screenWidth / 2) {
                setInvertedX(true)
            }
            if (rect.top > screenHeight / 2) {
                setInvertedY(true)
            }
        }
        setVisible(true)
    }

    const hideTooltip = () => {
        setVisible(false)
    }



    return (
        <span ref={tooltilRef} className='relative'>
            <VilaIcon type='help' className='text-primary-100 text-3xl' onMouseEnter={() => showTooltip()} onMouseLeave={() => hideTooltip()} />
            {visible &&
                <div style={{ width: (screenWidth / 2 - 20) + 'px' }} className={`bg-modalTransparent absolute ${invertedX ? '-translate-x-full' : 'left-4'} ${invertedY ? '-translate-y-full' : ''} bg-background-300 max-w-[250px] rounded-lg p-2 text-lightFont-300 text-sm z-50`}>{message}</div>}
        </span>
    )
}