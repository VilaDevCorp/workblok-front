import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import { useMisc } from '../../hooks/useMisc';
import { useTranslation } from 'react-i18next';
import { VilaButton } from '../ui/VilaButton';
import { VilaModal } from '../ui/VilaModal';
import { TemplatePlanner } from './TemplatePlanner';
import { VilaTextInput } from '../ui/VilaTextInput';
import { VilaField } from '../ui/VilaField';
import { TemplateTask } from '../../types/entities';
import { useNavigate } from 'react-router-dom';
import { useApiError } from '../../hooks/useApiError';
import { useSnackbar } from '../../hooks/useSnackbar';


export function TemplatePlannerModal({ templateId, onClose }: { templateId?: string, onClose: () => void }) {

    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [tasks, setTasks] = useState<TemplateTask[][]>([[], [], [], [], [], [], []])
    const [size, setSize] = useState<number | undefined>(undefined)
    const { getTemplate } = useApi()
    const { user } = useAuth()
    const { reloadTasksFlag } = useMisc()
    const { t } = useTranslation()
    const { setIsLoading, triggerReloadActivities } = useMisc()
    const navigate = useNavigate()
    const { setError } = useApiError({ navigate })
    const snackbar = useSnackbar()


    useEffect(() => {
        onGetTemplate()
    }, [reloadTasksFlag])


    const onGetTemplate = async () => {
        setIsLoading(() => true)
        try {
            if (templateId) {
                const template = await getTemplate(templateId)
                setId(template.id)
                setName(template.name)
                const newTasks: TemplateTask[][] = [[], [], [], [], [], [], []]
                template.edges.templateTasks ?
                    template.edges.templateTasks.forEach(
                        (task) => newTasks[task.weekDay - 1].push(task))
                    : undefined
                setTasks(newTasks)
            }
        } catch (e) {
            setError(e as Error)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <VilaModal onClose={onClose} hasHeader title={`Template planner`} size='l'
            buttons={[<VilaButton buttonStyle={'outlined'} onClick={() => onClose()} font='lightFont'>{'Close'}</VilaButton>]}>
            <TemplatePlanner templateId={templateId!} tasks={tasks} setTasks={setTasks} />
        </VilaModal >
    )
}