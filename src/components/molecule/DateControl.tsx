import React from 'react';
import { VilaButtonIcon } from '../ui/VilaButtonIcon';
import moment from 'moment';

export function DateControl({ startDate, setStartDate }: { startDate: Date | undefined, setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>> }) {

    const onPreviousWeek = () => {
        setStartDate((oldValue) => moment(oldValue).subtract(7, 'days').toDate())
    }

    const onNextWeek = () => {
        setStartDate((oldValue) => moment(oldValue).add(7, 'days').toDate())
    }


    return (
        <div className={`flex justify-start items-center rounded-lg w-[200px] gap-2`}>
            <VilaButtonIcon disabled={!startDate} size={'s'} icon={'previous'} onClick={onPreviousWeek}></VilaButtonIcon>
            <div className='flex gap-2'>
                <span>{moment(startDate).format('MMMM')}</span>
                <span>{startDate?.getFullYear()}</span>
            </div>
            <VilaButtonIcon disabled={!startDate} size={'s'} icon={'next'} onClick={onNextWeek}></VilaButtonIcon>
        </div>
    )
}