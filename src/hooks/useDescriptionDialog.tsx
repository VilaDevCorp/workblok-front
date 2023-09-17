import { createContext, ReactNode, useContext, useEffect, useState } from 'react';



export interface DescriptionDialogContext {
  text: string
  modalText: string
  event?: React.MouseEvent
  onShowDescriptionDialog: (text: string, inModal: boolean, event: React.MouseEvent) => void
  onHideDescriptionDialog: () => void
}

const DescriptionDialogContext = createContext<DescriptionDialogContext>({} as any)

export const useDescriptionDialog = () => {
  const ctx = useContext(DescriptionDialogContext)
  if (ctx === null) {
    throw new Error('useDescriptionDialog() can only be used on the descendants of DescriptionDialogProvider')
  } else {
    return ctx
  }
}

export const DescriptionDialogProvider = ({ children }: { children: ReactNode }) => {

  //Text for the description dialog when its not in the modal
  const [text, setText] = useState<string>('')

  //Text for the description dialog of a modal
  const [modalText, setModalText] = useState<string>('')
  const [event, setEvent] = useState<React.MouseEvent | undefined>(undefined)


  useEffect(() => {
    window.addEventListener('scroll', () => {
      onHideDescriptionDialog()
    }, { capture: true })
    return () => {
      window.removeEventListener('scroll', () => {
        onHideDescriptionDialog()
      }, { capture: true })
    }
  }, [])



  const onShowDescriptionDialog = (text: string, inModal: boolean, event: React.MouseEvent) => {
    if (inModal) {
      setModalText(text)
    } else {
      setText(text)
    }
    setEvent(event)
  }

  const onHideDescriptionDialog = () => {
    setText('')
    setModalText('')
    setEvent(undefined)
  }


  const value: DescriptionDialogContext = {
    text, modalText, event, onShowDescriptionDialog, onHideDescriptionDialog
  }

  return (
    <DescriptionDialogContext.Provider value={value}>
      {children}
    </DescriptionDialogContext.Provider>
  )
}
