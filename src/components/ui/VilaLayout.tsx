import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"
import { Header } from "../organism/Header"
import logo from './../../../public/logo.svg';
import { VilaButton } from "./VilaButton";

export function VilaLayout({ title, children, isPublic }: { title?: string, children: JSX.Element | JSX.Element[], isPublic?: boolean }) {


    const { user } = useAuth()
    const navigate = useNavigate()
    return (
        (isPublic || user) ?
            <>
                ({!isPublic ? <Header /> : <></>
                }
                <div className='flex max-w-[1500px] m-auto py-5 px-10'>
                    {title ?
                        <h1 className='text-2xl text-primary-500'>{title}</h1>
                        : undefined}
                    {children}
                </div>)
            </>
            :
            <div className={`flex w-[500px] h-full justify-center items-center flex-col gap-6 m-auto `}>
                <img src={logo} className='w-[150px] h-[150px]' alt='Logo login' />
                <p className="text-lightFont-500">{'You need an account to access this page'}</p>
                <VilaButton onClick={()=>navigate("/login")} font="lightFont">{'Login'}</VilaButton>
            </div>

    )
}