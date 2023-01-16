import { useRecoilState } from 'recoil';
import { ModalBase } from '../bases/ModalBase';
import { ButtonTypeEnum, IconTypeEnum, ModalButton, Page, SizeEnum } from '../../types/types';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { CoolTextInput } from '../atom/CoolTextInput';
import { useEffect, useState } from 'react';
import { ActivityArea } from './ActivityArea';
import { Activity } from '../../types/entities';
import { CoolIcon } from '../atom/CoolIcon';
import { useApi } from '../../hooks/useApi';
import { CoolPagination } from '../molecule/CoolPagination';
import { useAuth } from '../../hooks/useAuth';


const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    overflow: hidden;
    height: 40vh;
    gap: 2vh;
`

const ActivityBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 30vh;
    justify-content: center;
`
const SearchBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    position:sticky;
    gap: 2%;
    font-size: ${props => props.theme.fontSize.title};
    height: 10vh;
    color: ${props => props.theme.color.highlightColor};
    justify-content: center;
`




export function SelectActivityModal() {

    const { modalProps, setModalProps } = useModal()
    const [searchText, setSearchText] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [activityPage, setActivityPage] = useState<Page<Activity> | undefined>(undefined)
    const [selectedActivities, setSelectedActivities] = useState<string[]>([])
    const { getActivities, createTask } = useApi()
    const { user } = useAuth()

    const onGetActivities = async () => {
        const activityPage = await getActivities(page, searchText)
        setActivityPage(activityPage)
    }

    useEffect(() => {
        onGetActivities()
    }, [searchText, page])

    useEffect(() => {
        setPage(1)
    }, [searchText])


    const onConfirm = async () => {
        await Promise.all(selectedActivities.map(async (activity) => {
            if (modalProps.params?.date && user?.id) {
                await createTask({ activityId: activity, dueDate: modalProps.params?.date, userId: user.id })
            }
        }))
        onClear()

    }


    const onClear = () => {
        setSelectedActivities([])
        setModalProps({ visible: false })
    }

    const buttons: ModalButton[] = [
        { type: IconTypeEnum.CANCEL, onClick: onClear, label: 'Cancel' },
        { type: IconTypeEnum.CONFIRM, onClick: onConfirm, label: 'Confirm' },

    ]


    return (
        <ModalBase size={SizeEnum.M_VERTICAL} buttons={buttons} onClose={() => { onClear() }}>
            <MainBox>
                <SearchBox>
                    <CoolIcon type={IconTypeEnum.SEARCH} />
                    <CoolTextInput id='searchText' setValue={setSearchText} value={searchText} isDark />
                </SearchBox>
                <ActivityBox>
                    <ActivityArea activities={activityPage?.content ? activityPage.content : []} selectedActivities={selectedActivities} setSelectedActivities={setSelectedActivities} />
                </ActivityBox>
            </MainBox>
            <CoolPagination isLoading={isLoading} page={page} setPage={setPage} totalPages={activityPage?.totalPages ? activityPage.totalPages : 0} />
        </ModalBase>
    )
}