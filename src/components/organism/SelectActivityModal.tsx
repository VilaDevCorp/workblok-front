import { useRecoilState } from 'recoil';
import { ModalBase } from '../bases/ModalBase';
import { ButtonTypeEnum, IconTypeEnum, ModalButton, SizeEnum } from '../../types/types';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { CoolTextInput } from '../atom/CoolTextInput';
import { useEffect, useState } from 'react';
import { ActivityArea } from './ActivityArea';
import { Activity } from '../../types/entities';
import { CoolIcon } from '../atom/CoolIcon';
import { selectedActivitiesAtom } from '../../recoil/mainAtoms';
import { useApi } from '../../hooks/useApi';


const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    height: 50vh;
    gap: 2vh;
`

const ActivityBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 40vh;
    justify-content: center;
`
const SearchBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 2%;
    font-size: ${props => props.theme.fontSize.title};
    height: 10vh;
    color: ${props => props.theme.color.highlightColor};
    justify-content: center;
`




export function SelectActivityModal() {

    const { modalProps, setModalProps } = useModal()
    const [searchText, setSearchText] = useState<string>('')
    const [activities, setActivities] = useState<Activity[]>([])
    const [selectedActivitiesModal, setSelectedActivities] = useRecoilState<string[]>(selectedActivitiesAtom)
    const { getActivities } = useApi()

    const onGetActivities = async () => {
        const result = await getActivities()
        setActivities(result)
    }

    useEffect(() => {
        onGetActivities()
    }, [])


    const onClear = () => {
        setSelectedActivities([])
        setModalProps({ visible: false })
    }

    const buttons: ModalButton[] = [
        { type: IconTypeEnum.CANCEL, onClick: onClear },
        { type: IconTypeEnum.CONFIRM, onClick: onClear },

    ]


    return (
        <ModalBase size={SizeEnum.M_VERTICAL} buttons={buttons} onClose={() => { onClear() }}>
            <MainBox>
                <SearchBox>
                    <CoolIcon type={IconTypeEnum.SEARCH} />
                    <CoolTextInput id='searchText' setValue={setSearchText} value={searchText} isDark />
                </SearchBox>
                <ActivityBox>
                    <ActivityArea activities={activities} />
                </ActivityBox>
            </MainBox>
        </ModalBase>
    )
}