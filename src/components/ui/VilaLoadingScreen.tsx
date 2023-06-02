import {PuffLoader } from 'react-spinners';
import logo from './../../../public/logo.svg'


// const MainBox = styled.div`
//     display: flex;
//     background: ${props=> props.theme.color.main.n};
//     box-sizing: border-box;
//     flex-direction: column;
//     padding: 1% 2%;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: 100vh;
//     overflow: hidden;
//     & img {
//         width: 200px;
//         height: 200px;
//         margin-bottom: 5vh;
//     }
//     & span {
//         margin-right: 15px;
//     }
// `;


export function VilaLoadingScreen() {

    return (
        <div className='flex bg-background-500 flex-col justify-center items-center w-full h-screen overflow-hidden '>
            <img src={logo} className='w-[200px] h-[200px]' alt='Imagen cargando página' style={{ cursor: 'pointer' }}></img>
            <PuffLoader color='#124969' loading size={75}  />
        </div>
    )
}