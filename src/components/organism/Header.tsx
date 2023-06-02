import { useNavigate } from 'react-router-dom';
import headerImg from './../../../public/logo.svg';
import { HeaderUser } from '../molecule/HeaderUser';
import { TopMenu } from '../molecule/TopMenu';
import { useScreen } from '../../hooks//useScreen';

export function Header() {
    const navigate = useNavigate()
    const { screenWidth } = useScreen()

    return (
        <div className='flex w-full h-[100px] px-3 py-2 items-center max-w-[1400px] m-auto'>
            <img src={headerImg} alt='Logo header' className='cursor-pointer ml-2 h-[60px] w-[100px] ' onClick={() => navigate('/')} />
            <TopMenu />
            <HeaderUser />
        </div>
    )
}