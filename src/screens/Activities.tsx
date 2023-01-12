import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { CoolButton } from '../components/atom/CoolButton';
import { CoolTable } from '../components/organism/CoolTable';
import { useApi } from '../hooks/useApi';
import { useModal } from '../hooks/useModal';
import { reloadActivitiesAtom, snackAtom } from '../recoil/mainAtoms';
import { Test } from '../types/entities';
import { ButtonStyleEnum, ContextOption, IconTypeEnum, Page } from '../types/types';


const MainBox = styled.div`
    display: flex;
    gap: 5vh;
    margin-left: 10%;
    margin-top: 5vh;
    justify-content: center;
    flex-direction: column;
`;

export function Activities() {

    const headers = [{ name: 'name', width: '80%' }, { name: 'size', width: '20%' }]


    const { getActivities, deleteActivity } = useApi();

    const [page, setPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<Page<Test> | undefined>(undefined)

    const { setConfirmationModalProps } = useModal()

    const [opensnack, setopensnack] = useRecoilState(snackAtom)
    const [reloadActivities, setReloadActivities] = useRecoilState(reloadActivitiesAtom)

    useEffect(() => {
        onGetData()
    }, [page, reloadActivities])

    const onGetData = async () => {
        setIsLoading(() => true)
        const data = await getActivities(page, "")
        if (data.content.length < 1 && page > 1) {
            setPage((old)=>old-1)
        }
        setData(data)
        setIsLoading(() => false)
    }

    const onDeleteActivity = async (id: string) => {
        await deleteActivity(id)
        setReloadActivities((old) => !old)
    }

    const contextOptions: ContextOption[] = [{
        type: IconTypeEnum.EDIT,
        label: 'Edit',
        onClick: (id: string) => {
        }
    }, {
        type: IconTypeEnum.DELETE,
        label: 'Delete',
        onClick: (id: string) => {
            setConfirmationModalProps({ visible: true, params: { elementId: id, body: 'Are you sure you want to delete this activity?', onConfirm: () => onDeleteActivity(id) } })
        }
    }]

    const sideButtons = [<CoolButton key={'sideButton_create'} clickFun={() => false} type={IconTypeEnum.ADD} style={ButtonStyleEnum.FILLED}>
        <>{'Create activity'}</>
    </CoolButton>
        ,
    ]


    return (
        <MainBox>

            <CoolTable width={50} height={50} headers={headers} data={data} page={page} setPage={setPage} isLoading={isLoading}
                contextOptions={contextOptions} sideButtons={sideButtons} />
            {/* <CoolFormElement label='Tipo de petición'>
                    <CoolSelect id='select' setValue={setSelectVal} value={selectVal} options={optionsArray} />
                </CoolFormElement>
                <CoolFormElement label='Nombre'>
                    <CoolTextInput id='textinput' value={selectVal} setValue={setSelectVal} />
                </CoolFormElement>
                <CoolFormElement label='Tipo de petición'>
                    <CoolCheckbox value={checkbox} setValue={setCheckbox} label={'Aceptar términos y condiciones'} isDark />
    </CoolFormElement>*/}

        </MainBox>
    )
}
