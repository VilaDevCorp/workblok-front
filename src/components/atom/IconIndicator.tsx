import React from 'react';
import { ActivityIcon, ActivityType } from './ActivityIcon';

export function IconIndicator({ icon }: { icon?: string }) {

    return (
        <span>
            <div className={`w-[45px] h-[45px] flex justify-center items-center text-lightFont-500 cursor-default text-3xl opacity-100 rounded-full`}>
                <ActivityIcon type={icon as ActivityType} />
            </div>

        </span>
    )
}