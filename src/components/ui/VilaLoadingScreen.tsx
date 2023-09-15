import {PuffLoader } from 'react-spinners';
import logo from './../../../public/logo.svg'


export function VilaLoadingScreen() {

    return (
        <div style={{ background: 'linear-gradient(120deg, rgba(6,15,20,1) 0%, rgba(19,43,55,1) 100%)' }} className='flex bg-background-500 flex-col justify-center items-center w-full h-screen overflow-hidden '>
            <img src={logo} className='w-[200px] h-[200px]' alt='Imagen cargando página' style={{ cursor: 'pointer' }}></img>
            <PuffLoader color='#124969' loading size={100}  />
        </div>
    )
}