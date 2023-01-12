import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { CgCloseR } from 'react-icons/cg';
import { FaSignInAlt, FaUserCircle } from 'react-icons/fa';
import { MdAddCircleOutline, MdModeEdit, MdNavigateBefore, MdNavigateNext, MdOutlineCancel, MdOutlineModeEdit } from 'react-icons/md';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { BiSearch } from 'react-icons/bi';
import { IconTypeEnum } from '../../types/types';


export function CoolIcon({ type }: { type: IconTypeEnum }) {

    const getIcon = (): JSX.Element => {
        switch (type) {
            case IconTypeEnum.LOGOUT:
                return <RiLogoutCircleRLine />
            case IconTypeEnum.PREVIOUS:
                return <MdNavigateBefore />
            case IconTypeEnum.NEXT:
                return <MdNavigateNext />
            case IconTypeEnum.CANCEL:
                return <MdOutlineCancel />
            case IconTypeEnum.CONFIRM:
                return <BsCheck />
            case IconTypeEnum.CLOSE:
                return <CgCloseR />
            case IconTypeEnum.USER:
                return <FaUserCircle />
            case IconTypeEnum.LOGIN:
                return <FaSignInAlt />
            case IconTypeEnum.EDIT:
                return <MdOutlineModeEdit />
            case IconTypeEnum.DELETE:
                return <AiOutlineDelete />
            case IconTypeEnum.SEARCH:
                return <BiSearch />
            case IconTypeEnum.ADD:
                return <MdAddCircleOutline />
            default:
                return <></>
        }
    }

    return (
        getIcon()
    )
}