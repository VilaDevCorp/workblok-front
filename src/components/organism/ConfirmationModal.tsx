import { VilaButton } from '../ui/VilaButton';
import { VilaModal } from '../ui/VilaModal';


export function ConfirmationModal({ onClick, label, onClose }: { onClick: () => void, label: string, onClose: () => void }) {

    return (
        <VilaModal onClose={onClose} hasHeader size='xs-fluid-h'
            buttons={[<VilaButton buttonStyle={'outlined'} onClick={() => onClose()} font='lightFont'>{'Cancel'}</VilaButton>, <VilaButton font='lightFont' buttonStyle={'filled'} onClick={() => { onClick(); onClose() }}>{'Confirm'}</VilaButton>]}>
            <p className='text-lightFont-500 text-xl px-2 py-6 text-center'>{label}</p>
        </VilaModal >
    )
}