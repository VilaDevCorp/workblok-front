import React, { useEffect, useState } from 'react';
import { VilaButtonIcon } from '../ui/VilaButtonIcon';
import moment from 'moment';
import { useAuth } from '../../hooks/useAuth';
import { useApi } from '../../hooks/useApi';
import { Template } from '../../types/entities';
import { SelectOption, VilaSelect } from '../ui/VilaSelect';
import { useMisc } from '../../hooks/useMisc';
import { conf } from '../../conf';

export function TemplateSelector({ startDate }: { startDate: Date | undefined }) {

    const { user } = useAuth()
    const { getAllUserTemplates, applyTemplate } = useApi()
    const { triggerReloadTasks } = useMisc()

    const [templates, setTemplates] = useState<SelectOption[]>([])
    const [selectedTemplate, setSelectedTemplate] = useState<string>('')

    useEffect(() => {
        onGetTemplates()
    }, [])

    const onGetTemplates = async () => {
        const templates = await getAllUserTemplates(user?.id!)
        const options: SelectOption[] = templates.content.map((template) => { return { label: template.name, value: template.id } })
        setTemplates(options)
    }

    const onApplyTemplate = async () => {
        if (startDate && user) {
            await applyTemplate(selectedTemplate, { startDate: moment(startDate).format(conf.dateInputFormat), userId: user?.id })
            triggerReloadTasks()
        }
    }

    return (
        <div className={`flex justify-start items-center rounded-lg w-[200px] gap-2`}>
            <div className='flex gap-2'>
            </div>
            <VilaSelect options={templates} value={selectedTemplate} setValue={setSelectedTemplate} emptyLabel='Select a template to apply' />
            <VilaButtonIcon disabled={!selectedTemplate} onClick={onApplyTemplate} size={'s'} icon={'play'}></VilaButtonIcon>
        </div>
    )
}