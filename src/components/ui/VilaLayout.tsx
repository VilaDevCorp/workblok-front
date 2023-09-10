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
            <>
                {!isPublic ?
                    <>
                        <div style={{ scrollbarGutter: 'stable' }} className="w-full h-full p-4 overflow-auto">
                            <Header />
                            <main className='flex h-[calc(100%-100px)] max-w-[1500px] py-2 w-full max-h-[500px] bg-transparent ml-auto mr-auto'>
                                {title ? <h1 className='text-2xl text-primary-500'>{title}</h1> : undefined}
                                {children}
                            </main>
                            <footer className="w-full bg-primary-100 absolute bottom-0 h-[25px]"/>  
                        </div>
                    </>
                    :
                    <main className='flex max-w-[1500px] h-[100vh] overflow-auto w-full max-h-[900px] bg-transparent ml-auto mr-auto'>
                        {children}
                    </main>
                }
            </>
            :
            <div className={`flex w-screen h-full justify-center items-center flex-col gap-6 m-auto`}>
                <img src={logo} className='w-[120px] h-[120px]' alt='Logo login' />
                <p className="text-lightFont-500">{'You need an account to access this page'}</p>
                <VilaButton onClick={() => navigate("/login")} font="lightFont">{'Login'}</VilaButton>
            </div>
    )
}