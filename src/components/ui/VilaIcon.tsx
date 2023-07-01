import { AiOutlineDelete, AiOutlineDown, AiOutlineEdit, AiOutlineFile, AiOutlineFilePdf, AiOutlineRight, AiOutlineSearch } from 'react-icons/ai';
import { BsCheck, BsMap } from 'react-icons/bs';
import { CgCloseR } from 'react-icons/cg';
import { FiMail } from 'react-icons/fi';
import { FaRedo, FaRegListAlt, FaSignInAlt, FaUserCircle } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { RiCoinLine, RiLogoutCircleRLine } from 'react-icons/ri';
import { IoMdAddCircleOutline, IoMdArrowRoundBack, IoMdArrowRoundForward, IoMdPeople, IoMdPhonePortrait, IoIosMenu, IoMdClose, IoIosAdd, IoIosCalendar, IoIosPlay } from 'react-icons/io';
import { BiDownload, BiUpload } from 'react-icons/bi';
import { TbFileAlert } from 'react-icons/tb';
import { ImWarning } from 'react-icons/im';
import { GrInProgress } from 'react-icons/gr';
import { GoCheck } from 'react-icons/go';

export type IconType = "previous" | "next" | "logout" | "cancel" | "confirm" | "close" | "user" | "login" |
    "delete" | "edit" | "add" | "check" | "search" | "mail" | "phone" | "download" | "upload" | "alert" |
    "map" | "pdf" | "meeting" | "log" | "file" | "incidence" | "progress" | "important" | "redo" | "menu" |
    "unfold" | "fold" | "coin" | "calendar" | "play"

const getIcon = (type: IconType): JSX.Element => {
    switch (type) {
        case "logout":
            return <RiLogoutCircleRLine />
        case "previous":
            return <IoMdArrowRoundBack />
        case "next":
            return <IoMdArrowRoundForward />
        case "cancel":
            return <MdOutlineCancel />
        case "confirm":
            return <BsCheck />
        case "close":
            return <IoMdClose />
        case "user":
            return <FaUserCircle />
        case "login":
            return <FaSignInAlt />
        case "edit":
            return <AiOutlineEdit />
        case "delete":
            return <AiOutlineDelete />
        case "add":
            return <IoIosAdd />
        case "check":
            return <GoCheck />
        case "search":
            return <AiOutlineSearch />
        case "mail":
            return <FiMail />
        case "phone":
            return <IoMdPhonePortrait />
        case "download":
            return <BiDownload />
        case "upload":
            return <BiUpload />
        case "alert":
            return <ImWarning />
        case "map":
            return <BsMap />
        case "pdf":
            return <AiOutlineFilePdf />
        case "meeting":
            return <IoMdPeople />
        case "log":
            return <FaRegListAlt />
        case "file":
            return <AiOutlineFile />
        case "incidence":
            return <TbFileAlert />
        case "progress":
            return <GrInProgress />
        case "redo":
            return <FaRedo />
        case "menu":
            return <IoIosMenu />
        case "fold":
            return <AiOutlineRight />
        case "unfold":
            return <AiOutlineDown />
        case "coin":
            return <RiCoinLine />
        case "calendar":
            return <IoIosCalendar />
        case "play":
            return <IoIosPlay />
        default:
            return <></>
    }
}

type Props = {
    type: IconType
} & React.ComponentPropsWithoutRef<'span'>

export function VilaIcon(props: Props) {
    const { type, className, ...nativeProps } = props
    return (
        <span className={`flex justify-center items-center ${className}`} {...nativeProps} >
            {getIcon(props.type)}
        </span>
    )
}