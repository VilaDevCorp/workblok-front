import { PuffLoader } from 'react-spinners';
import { VilaLayout } from '../ui/VilaLayout';

export function PageLoadingScreen({ isPublic = false }: { isPublic?: boolean }) {

    return (
        <VilaLayout isPublic={isPublic} fillScreen>
            <article className='w-full flex justify-center items-center m-auto'>
                <PuffLoader color='#124969' loading size={100} />
            </article>
        </VilaLayout>
    )
}