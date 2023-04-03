import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CoolFormField } from '../atom/CoolFormField';

const MainBox = styled.div`
    display:flex;
    flex-wrap: wrap;
    width: 100%;
    align-content: flex-start;
`;

export interface CoolFormField {
    id: string
    formElement: JSX.Element | JSX.Element[]
}

export function CoolForm({ id, nColumns, formFields }: { id: string, nColumns: number, formFields: CoolFormField[] }) {

    const { t } = useTranslation()

    return (
        <MainBox>
            {formFields.map((formField) => <CoolFormField key={`form.${id}.${formField.id}`} label={t(`form.${id}.${formField.id}`)} nColumns={nColumns}>{formField.formElement}</CoolFormField>)}
        </MainBox>
    )
}