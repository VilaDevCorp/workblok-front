
export function StatElement({ label, value }: { label: string, value: string | JSX.Element }) {

    return (
        <div className='flex gap-2 items-center justify-between w-full'>
            <span className="text-lg text-lightFont-600">{label}</span>
            <span className="text-lightFont-400">{value}</span>
        </div>
    )
}