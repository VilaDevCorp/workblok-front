import { Logo } from "../components/atom/Logo";
import { Typography } from "../components/atom/Typography";
import { Layout } from "../components/organism/Layout";

export function PageLoadingScreen({ isPublic = false }: { isPublic?: boolean }) {

    return (
        <Layout isPublic={isPublic} fillScreen>
            <div className="flex flex-col m-auto items-center gap-4 h-[200px] justify-center ">
                <Logo className='' />
                <Typography className="animate-loadingPulse">{'Loading...'}</Typography>
            </div>

        </Layout>
    )
}