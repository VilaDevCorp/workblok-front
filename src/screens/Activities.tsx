import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ButtonStyleEnum, CoolButton } from '../components/atom/CoolButton';
import { ContextOption } from '../components/atom/CoolContextOption';
import { IconTypeEnum } from '../components/atom/CoolIcon';
import { ScreenFrame } from '../components/molecule/ScreenFrame';
import { ModalType } from '../components/organism/CoolModal';
import { CoolTable } from '../components/organism/CoolTable';
import { useApi } from '../hooks/useApi';
import { useMisc } from '../hooks/useMisc';
import { useModal } from '../hooks/useModal';
import { Test } from '../types/entities';
import { Page } from '../types/types';


const MainBox = styled.div`
    display:flex;
    gap: 20px;
    max-height: 950px;
    height: 100%;
`;

const TableBox = styled.div`
    display:flex;
    width: 80%;
    justify-content: center;
`;

const SideButtonsBox = styled.div`
    display:flex;
    width: 20%;
    min-width: 200px;
    padding-top: 70px;
    justify-content: center;
`;

export function Activities() {

    const headers = [{ name: 'name', width: '80%' }, { name: 'size', width: '20%' }]


    const { getActivities, deleteActivities } = useApi();

    const [page, setPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<Page<Test> | undefined>(undefined)
    const { reloadActivitiesFlag, setReloadActivitiesFlag } = useMisc()
    const [searchKey, setSearchKey] = useState<string>('')
    const { setConfirmationModalProps, setModalProps } = useModal()


    useEffect(() => {
        onGetData()
    }, [page, reloadActivitiesFlag])

    const onGetData = async () => {
        setIsLoading(() => true)
        const data = await getActivities(page, "")
        if (data.content.length < 1 && page > 1) {
            setPage((old) => old - 1)
        }
        setData(data)
        setIsLoading(() => false)
    }

    const onDeleteActivities = async (ids: string[]) => {
        await deleteActivities(ids)
        setReloadActivitiesFlag((old) => !old)
    }

    const onCreateActivity = () => {
        setModalProps({ visible: true, type: ModalType.CREATE_ACTIVITY })
    }

    const onUpdateActivity = (id: string) => {
        setModalProps({ visible: true, type: ModalType.CREATE_ACTIVITY, params: { elementId: id } })
    }



    const contextOptions: ContextOption[] = [{
        type: IconTypeEnum.EDIT,
        label: 'Edit',
        onClick: (ids: string[]) => {
            onUpdateActivity(ids[0])
        }
    }, {
        type: IconTypeEnum.DELETE,
        label: 'Delete',
        multi: true,
        onClick: (ids: string[]) => {
            setConfirmationModalProps({ visible: true, params: { body: 'Are you sure you want to delete this activity?', onConfirm: () => onDeleteActivities(ids) } })
        }
    }]

    return (
        <ScreenFrame>
            <MainBox>
                <TableBox>
                    <CoolTable id='activities' headers={headers} data={data} page={page} setPage={setPage} isLoading={isLoading}
                        contextOptions={contextOptions} searchKey={searchKey} setSearchKey={setSearchKey} />
                </TableBox>
                <SideButtonsBox>
                    <CoolButton key={'sideButton_create'} onClick={() => onCreateActivity()} iconType={IconTypeEnum.ADD} style={ButtonStyleEnum.FILLED}>
                        <>{'Create activity'}</>
                    </CoolButton>
                </SideButtonsBox>
            </MainBox>
        </ScreenFrame>
    )
}
