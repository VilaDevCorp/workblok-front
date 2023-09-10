import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"
import { Header } from "../organism/Header"
import logo from './../../../public/logo.svg';
import { VilaButton } from "./VilaButton";
import { useSnackbar } from "../../hooks/useSnackbar";
import { GrUserWorker } from "react-icons/gr";
import { VilaIcon } from "./VilaIcon";

export function VilaLayout({ title, children, isPublic, fillScreen }: { title?: string, children: JSX.Element | JSX.Element[], isPublic?: boolean, fillScreen?: boolean }) {


    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const snackbar = useSnackbar()

    return (

        (isPublic || user) ?
            <div className={`min-h-full md:min-h-full w-full px-4 py-4 ${isPublic && 'flex items-center justify-center'} `}>
                {!isPublic ?
                    <>
                        <Header />
                        <main className={`flex max-w-[1500px] h-full ${fillScreen && 'h-[calc(100vh-182px)]'} max-h-[600px] bg-transparent m-auto py-5 md:px-4 relative`}>
                            {title ? <h1 className='text-2xl text-primary-500'>{title}</h1> : undefined}
                            {children}
                        </main>
                        <footer className="max-w-[1500px] text-highlight text-sm w-full bottom-0 h-[50px] flex justify-end items-center gap-2 py-2">
                            <VilaIcon className="text-2xl" type="developer" /><span>{'Created by David Vila'}</span>
                        </footer>
                    </>
                    :
                    <main className='flex max-w-[1500px] h-full overflow-auto w-full max-h-[900px] bg-transparent ml-auto mr-auto'>
                        {children}
                    </main>
                }
            </div>
            :
            <main className={`flex w-screen h-full justify-center items-center py-5 flex-col gap-6 m-auto`}>
                <img src={logo} className='w-[120px] h-[120px]' alt='Logo login' />
                <p className="text-lightFont-500">{'You need an account to access this page'}</p>
                <VilaButton onClick={() => navigate("/login")} font="lightFont">{'Login'}</VilaButton>
            </main>
    )
}