import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { CoolButton } from '../components/atom/CoolButton';
import { ActivitiesTable } from '../components/organism/ActivitiesTable';
import { CoolTable } from '../components/organism/CoolTable';
import { useApi } from '../hooks/useApi';
import { useModal } from '../hooks/useModal';
import { reloadActivitiesAtom, snackAtom } from '../recoil/mainAtoms';
import { Test } from '../types/entities';
import { ButtonStyleEnum, ContextOption, IconTypeEnum, ModalType, Page } from '../types/types';


const MainBox = styled.div`
    display: flex;
    width: 100%;
    gap: 5vh;
    margin-top: 5vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export function Activities() {

    const headers = [{ name: 'name', width: '80%' }, { name: 'size', width: '20%' }]


    const { getActivities, deleteActivity } = useApi();

    const [page, setPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<Page<Test> | undefined>(undefined)

    const { setConfirmationModalProps, setModalProps } = useModal()

    const [opensnack, setopensnack] = useRecoilState(snackAtom)
    const [reloadActivities, setReloadActivities] = useRecoilState(reloadActivitiesAtom)

    useEffect(() => {
        onGetData()
    }, [page, reloadActivities])

    const onGetData = async () => {
        setIsLoading(() => true)
        const data = await getActivities(page, "")
        if (data.content.length < 1 && page > 1) {
            setPage((old) => old - 1)
        }
        setData(data)
        setIsLoading(() => false)
    }

    const onDeleteActivity = async (id: string) => {
        await deleteActivity(id)
        setReloadActivities((old) => !old)
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
        onClick: (id: string) => {
            onUpdateActivity(id)
        }
    }, {
        type: IconTypeEnum.DELETE,
        label: 'Delete',
        onClick: (id: string) => {
            setConfirmationModalProps({ visible: true, params: { elementId: id, body: 'Are you sure you want to delete this activity?', onConfirm: () => onDeleteActivity(id) } })
        }
    }]

    const sideButtons = [<CoolButton key={'sideButton_create'} clickFun={() => onCreateActivity()} type={IconTypeEnum.ADD} style={ButtonStyleEnum.FILLED}>
        <>{'Create activity'}</>
    </CoolButton>
        ,
    ]


    return (
        <MainBox>
            <ActivitiesTable width={75} height={70} headers={headers} data={data} page={page} setPage={setPage} isLoading={isLoading}
                contextOptions={contextOptions} sideButtons={sideButtons} />
        </MainBox>
    )
}
