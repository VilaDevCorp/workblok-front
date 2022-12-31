import { useRecoilState } from 'recoil';
import { isLoading } from '../../recoil/mainAtoms';
import { ModalBase } from './../bases/ModalBase';
import { IconTypeEnum, ModalButton, SizeEnum } from '../../types/types';
import styled from 'styled-components';
import { useModal } from '../../hooks/useModal';


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


export function ConfirmationModal() {

    const {confirmationModalProps, setConfirmationModalProps} = useModal()

    const [isLoadingState, setIsLoadingState] = useRecoilState<boolean>(isLoading)

    const onConfirm = async () => {
        setIsLoadingState(() => true)
        const onConfirm = confirmationModalProps.params?.onConfirm
        try {
            if (onConfirm) {
                await onConfirm()
                onClear()
            }
        } catch (e) {
        }
        finally {
            setIsLoadingState(() => false)
        }
    }

    const onClear = () => {
        setConfirmationModalProps(() => { return { visible: false } })
    }

    const buttons: ModalButton[] = [
        { type: IconTypeEnum.CANCEL, onClick: onClear },
        { type: IconTypeEnum.CONFIRM, onClick: onConfirm },

    ]


    return (
        confirmationModalProps.visible ?
            <ModalBase title={confirmationModalProps.title} size={SizeEnum.S} buttons={buttons} onClose={() => { onClear() }}>
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