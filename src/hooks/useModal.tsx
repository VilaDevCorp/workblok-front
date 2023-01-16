import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Rol, User } from '../types/entities';
import { ModalType, RolEnum } from '../types/types';
import { useApi } from './useApi';
import { useNavigate } from 'react-router-dom';


export interface ModalContext {
  modalProps: ModalProps,
  setModalProps: React.Dispatch<React.SetStateAction<ModalProps>>,
  confirmationModalProps: ConfirmationModalProps,
  setConfirmationModalProps: React.Dispatch<React.SetStateAction<ConfirmationModalProps>>,
}

export interface ConfirmationModalProps {
  visible: boolean
  title?: string
  params?: ModalParams
}

export interface ModalProps {
  visible: boolean
  title?: string
  type?: ModalType
  params?: ModalParams
}
export interface ModalParams {
  body?: string
  elementId?: string,
  date?:string
  onConfirm?: () => void
}

const ModalContext = createContext<ModalContext>({} as any)

export const useModal = () => {
  const ctx = useContext(ModalContext)
  if (ctx === null) {
    throw new Error('useModal() can only be used on the descendants of ModalProvider')
  } else {
    return ctx
  }
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {

  const [modalProps, setModalProps] = useState<ModalProps>({ visible: false })
  const [confirmationModalProps, setConfirmationModalProps] = useState<ConfirmationModalProps>({ visible: false })


  const value: ModalContext = {
    modalProps,
    setModalProps,
    confirmationModalProps,
    setConfirmationModalProps
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}
