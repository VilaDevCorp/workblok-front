import React, { MouseEventHandler, SetStateAction } from 'react';
import { VilaButtonIcon } from './VilaButtonIcon';
import { VilaButton } from './VilaButton';

export function VilaPagination({ page, setPage, totalPages, maxVisiblePages = 10 }:
    { page: number, setPage: React.Dispatch<SetStateAction<number>>, totalPages: number, maxVisiblePages?: number }) {

    const createButtons = () => {
        const pageButtonArray: JSX.Element[] = []

        let startPage = 1
        if (page + 1 > Math.floor(maxVisiblePages / 2)) {
            startPage = page - (Math.floor(maxVisiblePages / 2) - 1)
        }
        if (page + maxVisiblePages >= totalPages) {
            startPage = totalPages - (maxVisiblePages - 1)
        }
        if (page < 1 || startPage < 1 )  {
            startPage = 1
        }
        for (let i = startPage; i < startPage + maxVisiblePages && i < totalPages + 1; i++) {
            pageButtonArray.push(<VilaButton style={'filled'} key={`page_${i+1}`} font='lightFont' className={`w-10 flex justify-center text-lg h-fit !px-[3px] !py-[3px]`} disabled={page + 1 === i} onClick={() => setPage(i - 1)}>{i.toString()}</VilaButton >)
        }
        return pageButtonArray
    }

    return (
        totalPages ?
            <div className='flex gap-8 w-full items-center justify-center '>
                <VilaButtonIcon font='lightFont' icon='previous' size='s' disabled={page < 1} onClick={() => setPage((old) => old > 0 ? old - 1 : old)} />
                <div className='flex gap-5'>
                    {createButtons()}
                </div>
                <VilaButtonIcon font='lightFont' icon='next' size='s' disabled={page >= totalPages - 1} onClick={() => setPage((old) => old < totalPages - 1 ? old + 1 : old)} />
            </div> :
        <></>
    )
}