import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Header } from "../organism/Header";
import logo from "/logo.svg";
import { Footer } from "./Footer";
import { Typography } from "../atom/Typography";
import { Button } from "@chakra-ui/react";
import { SideMenu } from "../molecule/SideMenu";

export function Layout({
  title,
  children,
  isPublic,
  fillScreen,
}: {
  title?: string;
  children: JSX.Element | JSX.Element[];
  isPublic?: boolean;
  fillScreen?: boolean;
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return isPublic || user ? (
    //Public Layout
    isPublic ? (
      <main
        className={`min-h-full flex-col md:h-auto md:min-h-full w-full p-4 flex h-screen backdrop-blur-sm items-center justify-center`}
      >
        {children}
      </main>
    ) : (
      //Private layout
      <>
        <SideMenu />
        <main
          className={`w-full flex flex-col h-full max-w-[500px] m-auto p-8 gap-8`}
        >
          {children}
        </main>
      </>
    )
  ) : (
    //Not logged in layout
    <div
      className={`min-h-full flex  flex-col items-center bg-center md:min-h-full h-screen w-full px-4 py-4`}
    >
      <main
        className={`flex p-8 rounded-lg h-full md:h-auto justify-center items-center py flex-col gap-6 m-auto`}
      >
        <img src={logo} alt="Logo" className="mb-10 self-center  w-[200px]" />
        <Typography>{"You need an account to view this page"}</Typography>
        <Button onClick={() => navigate("/login")}>{"Sign in"}</Button>
      </main>
    </div>
  );
}
