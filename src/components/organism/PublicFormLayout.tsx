
export function PublicFormLayout({ children }: { children: JSX.Element | JSX.Element[] }) {

    return (

        <section className={`flex md:w-[500px] w-full backdrop-brightness-[20%] backdrop-blur-sm p-8 rounded-lg h-full md:h-auto max-h-[900px] items-center m-auto mt-auto ml-auto mr-auto flex-col gap-6 `}>
            {children}
        </section>
    )
}