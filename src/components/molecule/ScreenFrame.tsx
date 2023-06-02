
export function ScreenFrame({ title, children }: { title?: string, children: JSX.Element| JSX.Element[] }) {

    return (
        <div className='flex max-w-[1500px] min-h-[calc(100vh-100px)] m-auto py-5 px-10'>
            {title ?
                <h1 className='text-2xl text-primary-500'>{title}</h1>
                : undefined}
            {children}
        </div>
    )
}