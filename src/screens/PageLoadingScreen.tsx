import { useColorMode } from "@chakra-ui/react";
import { Typography } from "../components/atom/Typography";
import { Layout } from "../components/organism/Layout";
import logo from "/logo.svg";
import darkLogo from "/darkLogo.svg";

export function PageLoadingScreen({
  isPublic = false,
}: {
  isPublic?: boolean;
}) {
  const { colorMode } = useColorMode();
  return (
    <Layout isPublic={isPublic} fillScreen>
      <div className="flex flex-col m-auto items-center gap-4 h-[200px] justify-center ">
        <img
          src={colorMode === "dark" ? darkLogo : logo}
          alt="Logo"
          className="mb-10 self-center  w-[200px]"
        />
        <Typography className="animate-loadingPulse">{"Loading..."}</Typography>
      </div>
    </Layout>
  );
}
