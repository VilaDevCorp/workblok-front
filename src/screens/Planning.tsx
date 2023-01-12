import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { CoolButton } from '../components/atom/CoolButton';
import { CoolCheckbox } from '../components/atom/CoolCheckbox';
import { CoolFormElement } from '../components/atom/CoolFormElement';
import { CoolSelect } from '../components/atom/CoolSelect';
import { CoolTextInput } from '../components/atom/CoolTextInput';
import { ScreenFrame } from '../components/molecule/ScreenFrame';
import { CoolTable } from '../components/organism/CoolTable';
import { WeekPlanner } from '../components/organism/WeekPlanner';
import { useApi } from '../hooks/useApi';
import { useModal } from '../hooks/useModal';
import { snackAtom } from '../recoil/mainAtoms';
import { Test } from '../types/entities';
import { ColorEnum, ContextOption, IconTypeEnum, Page, SelectOption } from '../types/types';


const MainBox = styled.div`
    display: flex;
    gap: 5vh;
    margin-left: 10%;
    margin-top: 5vh;
    justify-content: center;
    flex-direction: column;
`;



export function Planning() {

    const headers = ['name', 'lastname', 'date']


    const { getTestData } = useApi();

    const [page, setPage] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<Page<Test> | undefined>(undefined)
    const [checkbox, setCheckbox] = useState<boolean>(false)

    const { setConfirmationModalProps } = useModal()


    const [selectVal, setSelectVal] = useState<string>('')

    const [opensnack, setopensnack] = useRecoilState(snackAtom)

    useEffect(() => {
        onGetData()
    }, [page])

    const onGetData = async () => {
        setIsLoading(() => true)
        const data = await getTestData(page)
        setData(data)
        setIsLoading(() => false)
    }

    const contextOptions: ContextOption[] = [{
        type: IconTypeEnum.EDIT,
        onClick: (ids: string[]) => {
            if (ids.length === 1) {
                console.log(`Editando el ${ids[0]}`)
            }
        }
    }, {
        type: IconTypeEnum.DELETE,
        onClick: (ids: string[]) => {
            ids.forEach((id) =>
                setConfirmationModalProps({ visible: true, params: { body: '¿Desea borrar el elemento?', onConfirm: () => console.log(`Borrando el ${id}`) }, title: 'Borrado' })
            )
        }
    }]

    const optionsArray: SelectOption[] = [
        { label: "Iniciativas", value: "iniciativas" },
        { label: "Quejas", value: "quejas" },
        { label: "Sugerencias", value: "sugerencias" }
    ]

    return (
        <MainBox>

            <WeekPlanner startDate={new Date(2022, 11, 26)} />
            {/* <CoolButton clickFun={() => setopensnack(({ visible: true, text: 'Elemento borrado correctamente', icon: IconTypeEnum.DELETE, color: ColorEnum.DANGER }))} />
                <CoolTable width={50} height={50} headers={headers} data={data} setPage={setPage} contextOptions={contextOptions} isLoading={isLoading}></CoolTable>
                <p style={{ position: 'absolute', top: 500 }}>{selectVal}</p> */}
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
