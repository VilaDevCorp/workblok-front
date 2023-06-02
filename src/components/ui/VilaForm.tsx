import React from 'react';
import { VilaField } from './VilaField';

export interface FormField {
    label: string,
    input: JSX.Element
}

export function VilaForm({ nColumns = 1, fields }: { nColumns: number, fields: FormField[] }) {

    return (
        <div className={`flex flex-wrap gap-[25px] `}>
            {fields.map((field) =>
                <VilaField label={field.label} nColumns={nColumns}>
                    {field.input}
                </VilaField>
            )}
        </div>
    )
}