import { PuffLoader } from 'react-spinners';
import logo from './../../../public/logo.svg'
import { VilaLayout } from '../ui/VilaLayout';

export function PageLoadingScreen({ isPublic = false }: { isPublic?: boolean }) {

    return (
        <VilaLayout isPublic={isPublic}>
            <article className='w-full h-full flex m-auto justify-center items-center'>
                <PuffLoader color='#124969' loading size={100} />
            </article>
        </VilaLayout>
    )
}