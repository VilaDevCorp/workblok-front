import React, { useState } from 'react';
import { VilaIcon } from './VilaIcon';

export function VilaTooltip({ message }: { message: string }) {

    const [visible, setVisible] = useState(false)

    return (
        <>
            <VilaIcon type='help' className='text-primary-100 text-3xl' onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} />
            {visible && <div className='absolute bg-background-300 rounded-lg p-2 text-lightFont-300 text-sm'>{message}</div>}
        </>
    )
}