import { AiOutlineDelete, AiOutlineDown, AiOutlineEdit, AiOutlineRight, AiOutlineSearch } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { CgCloseR, CgMenu } from 'react-icons/cg';
import { FaCoins, FaSignInAlt, FaUserCircle } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { IoMdAddCircleOutline, IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import { BiDownload, BiUpload } from 'react-icons/bi';
import { ImWarning } from 'react-icons/im';
import { GoCheck } from 'react-icons/go';


export enum IconTypeEnum {
    PREVIOUS,
    NEXT,
    LOGOUT,
    CANCEL,
    CONFIRM,
    CLOSE,
    USER,
    LOGIN,
    DELETE,
    EDIT,
    ADD,
    CHECK,
    SEARCH,
    DONWLOAD,
    UPLOAD,
    ALERT,
    IMPORTANT,
    COINS,
    UNFOLD,
    FOLD,
    MENU
}


const getIcon = (type: IconTypeEnum): JSX.Element => {
    switch (type) {
        case IconTypeEnum.LOGOUT:
            return <RiLogoutCircleRLine />
        case IconTypeEnum.PREVIOUS:
            return <IoMdArrowRoundBack />
        case IconTypeEnum.NEXT:
            return <IoMdArrowRoundForward />
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
            return <AiOutlineEdit />
        case IconTypeEnum.DELETE:
            return <AiOutlineDelete />
        case IconTypeEnum.ADD:
            return <IoMdAddCircleOutline />
        case IconTypeEnum.CHECK:
            return <GoCheck />
        case IconTypeEnum.SEARCH:
            return <AiOutlineSearch />
        case IconTypeEnum.DONWLOAD:
            return <BiDownload />
        case IconTypeEnum.UPLOAD:
            return <BiUpload />
        case IconTypeEnum.ALERT:
            return <ImWarning />
        case IconTypeEnum.COINS:
            return <FaCoins />
        case IconTypeEnum.FOLD:
            return <AiOutlineRight />
        case IconTypeEnum.UNFOLD:
            return < AiOutlineDown />
        case IconTypeEnum.MENU:
            return < CgMenu />
        default:
            return <></>
    }
}

export function CoolIcon({ type }: { type: IconTypeEnum }) {
    return (
        getIcon(type)
    )
}