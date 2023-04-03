import { ModalBase } from '../bases/ModalBase';
import { SizeEnum } from '../../types/types';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { CoolTextInput } from '../atom/CoolTextInput';
import { useEffect, useState } from 'react';
import { CoolTextArea } from '../atom/CoolTextArea';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import { SizeSelector } from '../molecule/SizeSelector';
import { IconSelector } from '../molecule/IconSelector';
import { useMisc } from '../../hooks/useMisc';
import { ActivityIconTypeEnum } from '../atom/ActivityIcon';
import { CoolButton } from '../atom/CoolButton';
import { IconTypeEnum } from '../atom/CoolIcon';
import { CoolForm } from './CoolForm';
import { useTranslation } from 'react-i18next';


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
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [icon, setIcon] = useState<ActivityIconTypeEnum | undefined>(undefined)
    const [size, setSize] = useState<string>('')
    const { createActivity, getActivity, updateActivity } = useApi()
    const { user } = useAuth()
    const { setIsLoading, setReloadActivitiesFlag } = useMisc()
    const {t} = useTranslation()

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
        setIsLoading(() => true)
        try {
            if (id) {
                await updateActivity({ id, name, size: Number.parseInt(size), icon: icon })
            } else {
                if (user?.id) {
                    await createActivity({ name, size: Number.parseInt(size), userId: user.id, icon: icon })
                }
            } setReloadActivitiesFlag((old) => !old)
        } catch (e) {
        }
        finally {
            onClear()
            setIsLoading(() => false)
        }
    }

    const onClear = () => {
        setModalProps(() => { return { visible: false } })
    }

    const buttons = [
        <CoolButton onClick={() => onClear()} iconType={IconTypeEnum.CANCEL}>{t('button.cancel')}</CoolButton>,
        <CoolButton onClick={() => onConfirm()} iconType={IconTypeEnum.CONFIRM}>{t('button.confirm')}</CoolButton>
    ]

    return (
        <ModalBase size={SizeEnum.M} buttons={buttons} onClose={() => { onClear() }}>
            {/* <CoolModalFormFrame title={id ? 'Update activity' : 'Create new activity'}> */}
            <CoolForm id='createActivityForm' nColumns={2} formFields={[
                {
                    id: 'name', formElement: <CoolTextInput id='name' value={name} setValue={setName} />
                },
                {
                    id: 'description', formElement: <CoolTextArea id='description' value={description} setValue={setDescription} />
                },
                {
                    id: 'icon', formElement: <IconSelector setIcon={setIcon} icon={icon} />
                },
                {
                    id: 'size', formElement: <SizeSelector setSize={setSize} size={size} />
                }]} />
        </ModalBase >
    )
}

