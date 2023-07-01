import { useEffect, useRef, useState } from 'react';
import { VilaLayout } from '../components/ui/VilaLayout';
import { useApi } from '../hooks/useApi';
import { useMisc } from '../hooks/useMisc';
import { TableCell, VilaTable } from '../components/ui/VilaTable';
import { VilaPagination } from '../components/ui/VilaPagination';
import { ContextOption } from '../components/ui/VilaContextMenu';
import { VilaButton } from '../components/ui/VilaButton';
import { Template } from '../types/entities';
import { ConfirmationModal } from '../components/organism/ConfirmationModal';
import { CreateTemplateModal } from '../components/organism/CreateTemplateModal';
import { TemplatePlannerModal } from '../components/organism/TemplatePlannerModal';
import { useAuth } from '../hooks/useAuth';

export function TemplatesScreen() {

    const headers = ['name']


    const { getTemplates, deleteTemplates } = useApi();
    const {user} = useAuth()

    const firstRender = useRef(true)
    const [page, setPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<TableCell[]>([])
    const { reloadTemplatesFlag, triggerReloadTemplates } = useMisc()
    const [searchKey, setSearchKey] = useState<string>('')
    const [createTemplateModalVisible, setCreateTemplateModalVisible] = useState<boolean>(false)
    const [plannerTemplateModalVisible, setPlannerTemplateModalVisible] = useState<boolean>(false)
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState<boolean>(false)
    const [templateForEdit, setTemplateForEdit] = useState<string | undefined>(undefined)
    const [templatesForDelete, setTemplatesForDelete] = useState<string[]>([])


    useEffect(() => {
        onGetTemplates()
    }, [page, reloadTemplatesFlag])

    useEffect(() => {
        if (!firstRender.current) {
            const timer = setTimeout(() => onReloadTemplates(), 500)
            return (() => clearTimeout(timer))
        }
        firstRender.current = false
    }, [searchKey])

    const onReloadTemplates = () => {
        if (page === 0) {
            onGetTemplates()
        } else {
            setPage(0)
        }
    }

    const onGetTemplates = async () => {
        setIsLoading(() => true)
        const data = await getTemplates(page, searchKey, user?.id!)
        setTotalPages(data.totalPages)
        const tableData: TableCell[] = []
        data.content.map((dataElement) => tableData.push({ displayFields: [dataElement.name], realEntity: dataElement }))
        if (data.content.length < 1 && page > 1) {
            setPage((old) => old - 1)
        }
        setTableData(tableData)
        setIsLoading(() => false)
    }

    const onCreateTemplate = () => {
        setCreateTemplateModalVisible(true)
    }

    const onUpdateTemplate = (id: string) => {
        setTemplateForEdit(id)
        setCreateTemplateModalVisible(true)
    }

    const onOpenPlannerTemplate = (id: string) => {
        setTemplateForEdit(id)
        setPlannerTemplateModalVisible(true)
    }


    const onCloseCreateTemplateModal = () => {
        setTemplateForEdit(undefined)
        setCreateTemplateModalVisible(false)
    }

    const onClosePlannerTemplateModal = () => {
        setTemplateForEdit(undefined)
        setPlannerTemplateModalVisible(false)
    }


    const onPrepareDelete = (templates: string[]) => {
        setTemplatesForDelete(templates)
        setConfirmDeleteModalVisible(true)
    }

    const onDelete = async () => {
        await deleteTemplates(templatesForDelete)
        triggerReloadTemplates()
        setTemplatesForDelete([])
        setConfirmDeleteModalVisible(false)
    }

    const onCloseDeleteConfirmationModal = () => {
        setTemplatesForDelete([])
        setConfirmDeleteModalVisible(false)
    }



    const contextOptions: ContextOption[] = [{
        label: 'Edit',
        icon: 'edit',
        onClick: (elements: unknown[]) => {
            const templates = elements as Template[]
            onUpdateTemplate(templates[0].id)
        }
    }, {
        label: 'Planning',
        icon: 'calendar',
        onClick: (elements: unknown[]) => {
            const templates = elements as Template[]
            onOpenPlannerTemplate(templates[0].id)
        }
    }, {
        label: 'Delete',
        icon: 'delete',
        isMulti: true,
        onClick: (elements: unknown[]) => {
            const templates = elements as Template[]
            onPrepareDelete(templates.map((template) => template.id))
        }
    }]

    return (
        <VilaLayout>
            <div className='flex w-full flex-col h-[65vh]'>
                <VilaTable headers={headers} data={tableData} isLoading={isLoading} buttons={[<VilaButton key={'add_template_but'} icon='add' font='lightFont' onClick={() => onCreateTemplate()} >{'Add template'}</VilaButton>]}
                    searchKey={searchKey} setSearchKey={setSearchKey} contextOptions={contextOptions} />
                <VilaPagination page={page} setPage={setPage} totalPages={totalPages} maxVisiblePages={10} />
            </div>
            <>{createTemplateModalVisible && <CreateTemplateModal templateId={templateForEdit} onClose={() => onCloseCreateTemplateModal()} />}</>
            <>{plannerTemplateModalVisible && <TemplatePlannerModal templateId={templateForEdit} onClose={() => onClosePlannerTemplateModal()} />}</>
            <>{confirmDeleteModalVisible && <ConfirmationModal onClick={() => onDelete()} onClose={() => onCloseDeleteConfirmationModal()} label='These templates will be deleted. Are you sure?' />}</>

        </VilaLayout>
    )
}
