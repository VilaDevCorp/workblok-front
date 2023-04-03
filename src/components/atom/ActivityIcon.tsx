import { BiRun } from 'react-icons/bi';
import { GiBoxingGlove, GiWeightLiftingUp } from 'react-icons/gi';
import { IoMdFootball } from 'react-icons/io';
import { FaFootballBall, FaRunning } from 'react-icons/fa';
import { MdDirectionsWalk, MdOutlineDirectionsBike } from 'react-icons/md';

export enum ActivityIconTypeEnum {
    RUNNING = 'running',
    LIFTING = 'lifting',
    BIKE = 'bike',
    FOOTBALL = 'football',
    BOXING = 'boxing',
    RUGBY = 'rugby',
    WALK = 'walk'
}

export function ActivityIcon({ type }: { type?: ActivityIconTypeEnum }) {

    const getIcon = (): JSX.Element => {
        switch (type) {
            case ActivityIconTypeEnum.RUNNING:
                return <BiRun />
            case ActivityIconTypeEnum.BOXING:
                return <GiBoxingGlove />
            case ActivityIconTypeEnum.FOOTBALL:
                return <IoMdFootball />
            case ActivityIconTypeEnum.RUGBY:
                return <FaFootballBall />
            case ActivityIconTypeEnum.BIKE:
                return <MdOutlineDirectionsBike />
            case ActivityIconTypeEnum.LIFTING:
                return <GiWeightLiftingUp />
            case ActivityIconTypeEnum.WALK:
                return <MdDirectionsWalk />
            default:
                return <></>
        }
    }

    return (
        getIcon()
    )
}