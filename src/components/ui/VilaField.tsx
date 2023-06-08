import React from 'react';


export function VilaField({ children, label, nColumns }: { children: JSX.Element, label: string, nColumns: number }) {

    return (
        <div style={{ width: `calc((100% - ${(nColumns - 1) * 20}px)/ ${nColumns})` }}>
            <label><div className='text-lightFont-500 mb-2'>{label}</div> {children}</label>
        </div>
    )
}   