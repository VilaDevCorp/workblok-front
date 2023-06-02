import { BiRun } from 'react-icons/bi';
import { GiBoxingGlove, GiWeightLiftingUp } from 'react-icons/gi';
import { IoMdFootball } from 'react-icons/io';
import { FaFootballBall, FaRunning } from 'react-icons/fa';
import { MdDirectionsWalk, MdOutlineDirectionsBike } from 'react-icons/md';

export const activities = ['running', 'lifting', 'bike', 'football', 'boxing', 'rugby', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk', 'walk'];


export type ActivityType = typeof activities[number]

export function ActivityIcon({ type }: { type?: ActivityType }) {

    const getIcon = (): JSX.Element => {
        switch (type) {
            case 'running':
                return <BiRun />;
            case 'boxing':
                return <GiBoxingGlove />;
            case 'football':
                return <IoMdFootball />;
            case 'rugby':
                return <FaFootballBall />;
            case 'bike':
                return <MdOutlineDirectionsBike />;
            case 'lifting':
                return <GiWeightLiftingUp />;
            case 'walk':
                return <MdDirectionsWalk />;
            default:
                return <></>;
        }
    }

    return (
        <span className='flex justify-center items'>
            {getIcon()}
        </span>
    )
}