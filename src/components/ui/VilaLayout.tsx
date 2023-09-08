import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"
import { Header } from "../organism/Header"
import logo from './../../../public/logo.svg';
import { VilaButton } from "./VilaButton";
import { useSnackbar } from "../../hooks/useSnackbar";

export function VilaLayout({ title, children, isPublic }: { title?: string, children: JSX.Element | JSX.Element[], isPublic?: boolean }) {


    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const snackbar = useSnackbar()

    return (

        (isPublic || user) ?
            <div className={`min-h-full md:min-h-screen w-full px-4 py-4 ${isPublic && 'flex items-center justify-center'} `}>
                {!isPublic ?
                    <>
                        <Header />
                        <div className='flex max-w-[1500px] max-h-[900px] bg-transparent m-auto py-5 px-2 md:px-4 h-[calc(100vh-132px)]'>
                            {title ? <h1 className='text-2xl text-primary-500'>{title}</h1> : undefined}
                            {children}
                        </div>
                    </>
                    :
                    children
                }
            </div>
            :
            <div className={`flex w-screen h-full justify-center items-center flex-col gap-6 m-auto`}>
                <img src={logo} className='w-[120px] h-[120px]' alt='Logo login' />
                <p className="text-lightFont-500">{'You need an account to access this page'}</p>
                <VilaButton onClick={() => navigate("/login")} font="lightFont">{'Login'}</VilaButton>
            </div>
    )
}