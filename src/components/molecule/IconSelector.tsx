import React from 'react';
import styled from 'styled-components';
import { ActivityIcon, ActivityType, activities } from '../atom/ActivityIcon';

export function IconSelector({ icon, setIcon }: {
    icon: ActivityType | undefined, setIcon: React.Dispatch<React.SetStateAction<ActivityType | undefined>>
}) {

    return (
        <div className='flex gap-4 w-full items-center flex-wrap max-h-[150px] overflow-y-auto'>
            {activities.map((iconOption) =>
                <div key={`${iconOption}_icon`} className={`w-[35px] h-[35px] flex justify-center items-center text-lightFont-500 cursor-default text-2xl ${icon === iconOption ? ' opacity-100 ' : ' opacity-30 '} rounded-full`}
                    onClick={() => setIcon(iconOption as ActivityType)}>
                    <ActivityIcon type={iconOption as ActivityType} />
                </div>
            )}
        </div>
    )
}