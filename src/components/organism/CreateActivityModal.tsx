import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoading, reloadActivitiesAtom } from '../../recoil/mainAtoms';
import { ModalBase } from '../bases/ModalBase';
import { ActivityIconTypeEnum, IconTypeEnum, ModalButton, SelectOption, SizeEnum } from '../../types/types';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { CoolFormElement } from '../atom/CoolFormElement';
import { CoolModalFormFrame } from './CoolModalFormFrame';
import { CoolTextInput } from '../atom/CoolTextInput';
import { useEffect, useState } from 'react';
import { CoolTextArea } from '../atom/CoolTextArea';
import { CoolSelect } from '../atom/CoolSelect';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import { SizeSelector } from '../molecule/SizeSelector';
import { IconSelector } from '../molecule/IconSelector';


const StyledText = styled.p`
    font-size: ${props => props.theme.fontSize.title};
    color: ${props => props.theme.color.lightFont};
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0;
`;


export function CreateActivityModal() {

    const { modalProps, setModalProps } = useModal()

    const [isLoadingState, setIsLoadingState] = useRecoilState<boolean>(isLoading)
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [icon, setIcon] = useState<ActivityIconTypeEnum | undefined>(undefined)
    const [size, setSize] = useState<string>('')
    const { createActivity, getActivity, updateActivity } = useApi()
    const setReloadActivities = useSetRecoilState<boolean>(reloadActivitiesAtom)
    const { user } = useAuth()

    useEffect(() => {
        onGetActivity()
    }, [modalProps.visible])


    const onGetActivity = async () => {
        if (modalProps.params?.elementId) {
            const activity = await getActivity(modalProps.params?.elementId)
            setId(activity.id)
            setName(activity.name)
            setSize(activity.size.toString())
            setIcon(activity.icon ? activity.icon : undefined)
        }
    }

    const onConfirm = async () => {
        setIsLoadingState(() => true)
        try {
            if (id) {
                await updateActivity({ id, name, size: Number.parseInt(size) })
            } else {
                if (user?.id) {
                    await createActivity({ name, size: Number.parseInt(size), userId: user.id, icon: icon })
                }
            }
            setReloadActivities((old) => !old)
        } catch (e) {
        }
        finally {
            onClear()
            setIsLoadingState(() => false)
        }
    }

    const onClear = () => {
        setModalProps(() => { return { visible: false } })
    }

    const buttons: ModalButton[] = [
        { type: IconTypeEnum.CANCEL, onClick: onClear, label: 'Cancel' },
        { type: IconTypeEnum.CONFIRM, onClick: onConfirm, label: 'Confirm' },

    ]

    return (
        <ModalBase size={SizeEnum.M} buttons={buttons} onClose={() => { onClear() }}>
            <CoolModalFormFrame title={id ? 'Update activity' : 'Create new activity'}>
                <CoolFormElement label={'Name'}>
                    <CoolTextInput id='name' value={name} setValue={setName} />
                </CoolFormElement>
                <CoolFormElement label={'Description'}>
                    <CoolTextArea id='description' value={description} setValue={setDescription} />
                </CoolFormElement>
                <CoolFormElement label={'Icon'}>
                    <IconSelector setIcon={setIcon} icon={icon} />
                </CoolFormElement>
                <CoolFormElement label={'Size'}>
                    <SizeSelector setSize={setSize} size={size} />
                </CoolFormElement>
            </CoolModalFormFrame>
        </ModalBase>
    )
}

