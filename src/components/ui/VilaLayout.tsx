import { Header } from "../organism/Header"

export function VilaLayout({ title, children, isPublic }: { title?: string, children: JSX.Element | JSX.Element[], isPublic?: boolean }) {

    return (
        <>
            {!isPublic ? <Header /> : <></>}
            <div className='flex max-w-[1500px] m-auto py-5 px-10'>
                {title ?
                    <h1 className='text-2xl text-primary-500'>{title}</h1>
                    : undefined}
                {children}
            </div>
        </>
    )
}