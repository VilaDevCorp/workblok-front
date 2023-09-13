import { SizeEnum } from '../../types/types';
import { ValueGradient, stylesVars } from '../../utils/stylesVars';

export function SizeIndicator({ size }: { size: SizeEnum }) {

    return (
        <div className={`w-[35px] h-[35px] flex justify-center text-darkFont-900 font-semibold items-center cursor-default text-2xl opacity-100 rounded-full`}
            style={{ border: `1px solid ${stylesVars.taskSize[size as keyof ValueGradient]}`, color: stylesVars.taskSize[size as keyof ValueGradient] }}>{size}</div>

    )
}