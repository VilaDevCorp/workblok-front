import { ApiError, Page } from '../../types/types';
import { useEffect, useState } from 'react';
import { ActivityArea } from './ActivityArea';
import { Activity } from '../../types/entities';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { VilaModal } from '../ui/VilaModal';
import { VilaPagination } from '../ui/VilaPagination';
import { VilaButton } from '../ui/VilaButton';
import { VilaTextInput } from '../ui/VilaTextInput';
import { conf } from '../../conf'
import moment from 'moment';
import { useMisc } from '../../hooks/useMisc';
import { useNavigate } from 'react-router-dom';
import { useApiError } from '../../hooks/useApiError';
import { useSnackbar } from '../../hooks/useSnackbar';
import StatusCode from 'status-code-enum';

export function TemplateSelectActivityModal({ templateId, weekDay, onClose }: { templateId: string, weekDay?: number, onClose: () => void }) {

    const [searchText, setSearchText] = useState<string>('')
    const [page, setPage] = useState<number>(0)
    const { t } = useTranslation()
    const { setIsLoading, triggerReloadTasks } = useMisc()

    const [activityPage, setActivityPage] = useState<Page<Activity> | undefined>(undefined)
    const [selectedActivities, setSelectedActivities] = useState<string[]>([])
    const { getActivities, createTemplateTask } = useApi()
    const { user } = useAuth()
    const navigate = useNavigate()
    const { setError } = useApiError({ navigate })
    const snackbar = useSnackbar()

    const handleEnterPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            onConfirm()
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleEnterPress);
        return () => {
            window.removeEventListener("keydown", handleEnterPress);
        };
    }, [selectedActivities]);


    const onGetActivities = async () => {
        setIsLoading(true)
        try {
            if (user === undefined) {
                throw new ApiError({ message: "Not user detected", cause: StatusCode.ServerErrorInternal })
            }
            const activityPage = await getActivities(page, searchText, user.id)
            setActivityPage(activityPage)
        } catch (e) {
            setError(e as Error)
        } finally {
            setIsLoading(false)
        }

    }

    useEffect(() => {
        onGetActivities()
    }, [page])

    useEffect(() => {
        const timer = setTimeout(() => onReloadActivities(), 500)
        return (() => clearTimeout(timer))
    }, [searchText])

    const onReloadActivities = () => {
        if (page === 0) {
            onGetActivities()
        } else {
            setPage(0)
        }
    }
    const onConfirm = async () => {
        setIsLoading(() => true)
        try {
            await Promise.all(selectedActivities.map(async (activity) => {
                if (weekDay && user?.id) {
                    await createTemplateTask(templateId, { activityId: activity, weekDay })
                    triggerReloadTasks()
                    snackbar.onOpen('Tasks added!', 'check', 'success')
                }
            }))
        } catch (e) {
            setError(e as Error)
        } finally {
            setIsLoading(false)
        }
        onClose()
    }

    return (
        <VilaModal onClose={onClose} hasHeader title='Select activity' size='m-longer'
            buttons={[<VilaButton buttonStyle={'outlined'} onClick={() => onClose()} font='lightFont'>{'Cancel'}</VilaButton>,
            <VilaButton font='lightFont' buttonStyle={'filled'} disabled={selectedActivities.length < 1} onClick={() => onConfirm()}>{'Save'}</VilaButton>]}>
            <div className='flex flex-col w-full h-full overflow-hidden gap-4'>
                <VilaTextInput icon='search' setValue={setSearchText} value={searchText} />
                <div className='flex flex-col w-full h-[500px] overflow-y-auto overflow-x-hidden items-center gap-2'>
                    <ActivityArea activities={activityPage?.content ? activityPage.content : []} selectedActivities={selectedActivities} setSelectedActivities={setSelectedActivities} />
                </div>
                <VilaPagination page={page} setPage={setPage} maxVisiblePages={5}
                    totalPages={activityPage?.totalPages ? activityPage.totalPages : 0} />
            </div>
        </VilaModal >
    )
}