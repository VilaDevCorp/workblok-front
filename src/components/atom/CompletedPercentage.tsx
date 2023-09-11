import { stylesVars } from '../../utils/stylesVars';

export function CompletedPercentage({ percentage }: { percentage: number }) {

    const getColor = () => {
        const gradient = stylesVars.percentageValue
        if (percentage >= 75) {
            return gradient[5];
        }
        if (percentage >= 50) {
            return gradient[4];
        }
        if (percentage >= 30) {
            return gradient[3];
        }
        return gradient[2];
    }

    return (
        <div style={{ background: `conic-gradient(${getColor()} ${360 / 100 * percentage}deg, transparent 5deg)` }}
            className='w-[60px] h-[60px] shrink-0 rounded-full flex justify-center items-center'>
            <span className='w-[48px] h-[48px] shrink-0 rounded-full text-md font-bold text-lightFont-200 bg-background-900  flex justify-center items-center '>{`${percentage.toFixed(0)}%`}</span>
        </div>
    )
}