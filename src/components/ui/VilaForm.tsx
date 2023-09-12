import React from 'react';
import { VilaField } from './VilaField';

export interface FormField {
    label: string,
    input: JSX.Element
}

export function VilaForm({ nColumns = 1, fields, onSubmit }: { nColumns: number, fields: FormField[], onSubmit: () => void }) {

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit() }} className={`flex flex-wrap gap-[20px] w-full `}>
            {fields.map((field) =>
                <VilaField key={field.label} label={field.label} nColumns={nColumns}>
                    {field.input}
                </VilaField>
            )}
            <button type="submit" className="hidden" />
        </form>
    )
}