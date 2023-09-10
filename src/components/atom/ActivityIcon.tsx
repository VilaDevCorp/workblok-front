import { BiRun, BiTennisBall } from 'react-icons/bi';
import { GiBoxingGlove, GiWeightLiftingUp } from 'react-icons/gi';
import { IoMdFootball } from 'react-icons/io';
import { FaFootballBall, FaRunning, FaSwimmer, FaHiking } from 'react-icons/fa';
import { MdDirectionsWalk, MdOutlineDirectionsBike, MdSportsHandball, MdSportsVolleyball } from 'react-icons/md';
import { TbBallBasketball, TbBarbell, TbYoga } from 'react-icons/tb';

export const activities = ['running', 'lifting', 'bike', 'football', 'boxing', 'rugby', 'walk', 'tennis-ball', 'basketball', 'barbell', 'swimmer', 'yoga', 'handball', 'volleyball', 'hiking'];


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
            case 'tennis-ball':
                return <BiTennisBall />;
            case 'basketball':
                return <TbBallBasketball />;
            case 'barbell':
                return <TbBarbell />;
            case 'swimmer':
                return <FaSwimmer />;
            case 'yoga':
                return <TbYoga />;
            case 'handball':
                return <MdSportsHandball />;
            case 'volleyball':
                return <MdSportsVolleyball />;
            case 'hiking':
                return <FaHiking />;
            default:
                return <></>;
        }
    }

    return (
        <span className='flex justify-center items-center'>
            {getIcon()}
        </span>
    )
}