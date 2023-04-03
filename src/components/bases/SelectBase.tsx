import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SelectOption } from '../../types/types';

const ButtonStyled = styled.button`
`;

export function SelectBase({ options, value, setValue, className, noEmpty, disabled }: {
    className?: string, options: SelectOption[], value: string, setValue: (value: string) => void, 
    noEmpty?: boolean, disabled?: boolean
}) {
    const { t } = useTranslation()

    return (
        <select className={className} disabled={disabled} value={value} onChange={(e) => setValue(e.target.value)}>
            {!noEmpty ? <option key={'undefined_key'} value={''}>{t('label.selectOption')}</option> : undefined}
            {options.map((option) =>
                <option key={option.value} value={option.value}>{option.label}</option>)
            }
        </select>
    )
}