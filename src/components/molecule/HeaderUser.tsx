import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks//useAuth';
import { VilaIcon } from '../ui/VilaIcon';
import { VilaButtonIcon } from '../ui/VilaButtonIcon';


export function HeaderUser() {

    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const onLogout = async () => {
        logout()
        navigate('/login')
    }

    return (
        <div className='ml-auto max-w-[500px] flex items-center gap-4'>
            <div className='flex max-w-[200px] w-full overflow-hidden gap-2 whitespace-nowrap flex-col'>
                <div className='flex items-center w-full text-lightFont-500 gap-2 '>
                    <VilaIcon type={"user"} className='w-6 h-6' />
                    {user?.username}
                </div>
                <div className='flex w-full text-coinIcon gap-2'>
                    <VilaIcon type={"coin"} className='w-6 h-6' />
                    {user?.dans}
                </div>
            </div>
            <VilaButtonIcon style={'transparent'} icon={"logout"} onClick={onLogout} size={'s'} />
        </div>
    )
}