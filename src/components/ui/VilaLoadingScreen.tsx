import {PuffLoader } from 'react-spinners';
import logo from './../../../public/logo.svg'


export function VilaLoadingScreen() {

    return (
        <div className='flex flex-col justify-center items-center w-full h-screen overflow-hidden '>
            <img src={logo} className='w-[200px] h-[200px]' alt='Imagen cargando página' style={{ cursor: 'pointer' }}></img>
            <PuffLoader color='#124969' loading size={100}  />
        </div>
    )
}