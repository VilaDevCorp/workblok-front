import { Logo } from "../atom/Logo";
import { Typography } from "../atom/Typography";

export function PublicFormLayout({ children, title }: { children: JSX.Element | JSX.Element[], title?: string }) {

    return (

        <section className={`flex md:w-[500px] w-full p-8 
            rounded-lg md:h-auto max-h-[900px] m-auto mt-auto ml-auto mr-auto flex-col gap-2 `}>
            <Logo className='text-sm mb-10 self-center' />
            <Typography mode='title' className='mb-4'>{title}</Typography>
            {children}
        </section>
    )
}