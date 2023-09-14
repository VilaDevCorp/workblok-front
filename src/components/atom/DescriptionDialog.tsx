import React, { useEffect, useRef } from 'react';
import { useMisc } from '../../hooks/useMisc';
import { useClickOutside } from '../../hooks/useClickOutside';
import { VilaButtonIcon } from '../ui/VilaButtonIcon';

export function DescriptionDialog({ isModal }: { isModal?: boolean }) {
    const { showDescription, setShowDescription, setModalShowDescription, modalShowDescription } = useMisc()
    const dialogBox = useRef(null)


    const onClose = () => {
        if (isModal) {
            setModalShowDescription('')
        } else {
            setShowDescription('')

        }
    }
    useClickOutside(dialogBox, () => onClose())

    return (
        <>
            {(isModal && modalShowDescription || !isModal && showDescription) &&
                <article ref={dialogBox} className={`fixed bg-modalTransparent p-4
                left-1/2  -translate-x-1/2  flex flex-col z-10 mt-4
                w-[300px] h-[200px] rounded-lg backdrop-blur-sm`}>
                    <VilaButtonIcon buttonStyle='transparent'  className='w-[20px] ml-auto' icon='close' size='xs' onClick={onClose} />
                    <p className='w-full h-full overflow-auto'>{isModal ? modalShowDescription : showDescription}</p>
                </article>}
        </>
    )
}