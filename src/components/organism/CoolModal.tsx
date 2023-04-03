import { useModal } from '../../hooks/useModal';
import { SelectActivityModal } from './SelectActivityModal';
import { CreateActivityModal } from './CreateActivityModal';

export enum ModalType {
    SELECT_ACTIVITY,
    CREATE_ACTIVITY
}

const getModalComponent = (modalType?: ModalType): JSX.Element => {
    switch (modalType) {
        case ModalType.SELECT_ACTIVITY:
            return <SelectActivityModal/>
        case ModalType.CREATE_ACTIVITY:
            return <CreateActivityModal/>
        default:
            return <></>
    }
}


export function CoolModal() {

    const { modalProps } = useModal()

    return (
        modalProps.visible ?
            getModalComponent(modalProps.type)
            : <></>
    )
}