
export function PublicFormLayout({ children }: { children: JSX.Element | JSX.Element[] }) {

    return (

        <section className={`flex w-[500px] h-full max-h-[900px]  items-center mt-auto ml-auto mr-auto flex-col gap-6 `}>
            {children}
        </section>
    )
}