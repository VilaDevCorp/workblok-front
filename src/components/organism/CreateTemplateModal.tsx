import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import { useMisc } from '../../hooks/useMisc';
import { useTranslation } from 'react-i18next';
import { VilaButton } from '../ui/VilaButton';
import { VilaModal } from '../ui/VilaModal';
import { VilaForm } from '../ui/VilaForm';
import { VilaTextInput } from '../ui/VilaTextInput';
import { useValidator } from '../../hooks/useValidator';
import { notEmptyValidator } from '../../hooks/useValidator';


export function CreateTemplateModal({ templateId, onClose }: { templateId?: string, onClose: () => void }) {

    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const { createTemplate, getTemplate, updateTemplate } = useApi()
    const { user } = useAuth()
    const { setIsLoading, triggerReloadTemplates } = useMisc()
    const { t } = useTranslation()
    const [nameDirty, nameError, nameMessage, nameValidate] = useValidator(name, [notEmptyValidator])


    useEffect(() => {
        onGetTemplate()
    }, [])


    const onGetTemplate = async () => {
        if (templateId) {
            const template = await getTemplate(templateId)
            setId(template.id)
            setName(template.name)
        }
    }

    const onConfirm = async () => {
        setIsLoading(() => true)
        const nameValid = nameValidate()
        try {
            if (id) {
                if (nameValid) {
                    await updateTemplate({ id, name })
                }
            } else {
                if (nameValid && user?.id) {
                    await createTemplate({ name, userId: user.id, tasks: [] })
                }
            }
            triggerReloadTemplates()
        } catch (e) {
        }
        finally {
            setIsLoading(() => false)
            onClose()
        }
    }

    return (
        <VilaModal onClose={onClose} hasHeader title={`${templateId ? 'Edit template' : 'Create template'}`} size='m-squared'
            buttons={[<VilaButton style={'outlined'} onClick={() => onClose()} font='lightFont'>{'Cancel'}</VilaButton>, <VilaButton font='lightFont' style={'filled'} onClick={() => onConfirm()}>{'Save'}</VilaButton>]}>
            <VilaForm nColumns={1} fields={[
                {
                    label: 'Name', input: <VilaTextInput value={name} setValue={setName} />
                }]} />
        </VilaModal >
    )
}