import { ModalBase } from './../bases/ModalBase';
import { SizeEnum } from '../../types/types';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';
import { useTranslation } from 'react-i18next';
import { useMisc } from '../../hooks/useMisc';
import { CoolButton, ButtonStyleEnum } from '../atom/CoolButton';
import { IconTypeEnum } from '../atom/CoolIcon';


const StyledText = styled.p`
    font-size: ${props => props.theme.fontSize.h2};
    color: ${props => props.theme.color.main.d4};
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0;
    width: 100%;
`;


export function ConfirmationModal() {

    const { confirmationModalProps, setConfirmationModalProps } = useModal()
    const { setIsLoading } = useMisc()
    const { t } = useTranslation()


    const onConfirm = async () => {
        setIsLoading(() => true)
        const onConfirm = confirmationModalProps.params?.onConfirm
        try {
            if (onConfirm) {
                await onConfirm()
                onClear()
            }
        } catch (e) {
        }
        finally {
            setIsLoading(() => false)
        }
    }

    const onClear = () => {
        setConfirmationModalProps(() => { return { visible: false } })
    }

    const buttons: JSX.Element[] = [
        <CoolButton style={ButtonStyleEnum.OUTLINED} iconType={IconTypeEnum.DONWLOAD} onClick={() => onClear()}>{t('button.download')}</CoolButton>,
        <CoolButton style={ButtonStyleEnum.OUTLINED} iconType={IconTypeEnum.CANCEL} onClick={() => onClear()}>{t('button.cancel')}</CoolButton>,
        <CoolButton style={ButtonStyleEnum.FILLED} iconType={IconTypeEnum.CONFIRM} onClick={() => onConfirm()}>{t('button.confirm')}</CoolButton>
    ]


    return (
        confirmationModalProps.visible ?
            <ModalBase title={confirmationModalProps.title} size={SizeEnum.XS} buttons={buttons} onClose={() => { onClear() }}>
                {confirmationModalProps.params?.body ?
                    <StyledText>
                        {confirmationModalProps.params.body}
                    </StyledText>
                    : <></>
                }
            </ModalBase>
            : <></>
    )
}