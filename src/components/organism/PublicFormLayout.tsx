import logo from "/logo.svg";
import darkLogo from "/darkLogo.svg";

import { Typography } from "../atom/Typography";
import { useColorMode } from "@chakra-ui/react";

export function PublicFormLayout({
  children,
  title,
  onSubmit
}: {
  children: JSX.Element | JSX.Element[];
  title?: string;
  onSubmit: () => void;
}) {
  const { colorMode } = useColorMode();

  return (
    <form
      className={`flex md:w-[500px] w-full p-8 
            rounded-lg md:h-auto max-h-[900px] m-auto mt-auto ml-auto mr-auto flex-col gap-2 `}
      onSubmit={(e) => { e.preventDefault(); onSubmit() }}
    >
      <img
        src={colorMode === "dark" ? darkLogo : logo}
        alt="Logo"
        className="mb-10 self-center  w-[200px]"
      />
      <Typography mode="title" className="mb-4">
        {title}
      </Typography>
      {children}
    </form>
  );
}
