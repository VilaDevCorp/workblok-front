import { IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronLeft, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { HiHome } from "react-icons/hi";
import { IoMdSettings, IoMdStats } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export function SideMenu() {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleLocked, setVisibleLocked] = useState<boolean>(false);

  const navigate = useNavigate();

  const optionMenuClasses =
    "w-[50px] !bg-transparent opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300";

  return (
    <div
      className={`flex  items-center transition-transform z-50 fixed  rounded-e-lg backdrop-blur-md ${
        !visible && !visibleLocked && "-translate-x-[66px]"
      } top-1/2 -translate-y-1/2 `}
      onMouseEnter={() => {
        if (visibleLocked) return;
        setVisible(true);
      }}
      onMouseLeave={() => {
        if (visibleLocked) return;
        setVisible(false);
      }}
    >
      <nav className="flex p-2 flex-col gap-4  rounded-e-lg">
        <IconButton
          className={optionMenuClasses}
          aria-label="Menu home option"
          onClick={() => navigate("/")}
          icon={<HiHome size={40} />}
        />
        <IconButton
          className={optionMenuClasses}
          aria-label="Menu stats option"
          onClick={() => navigate("/stats")}
          icon={<IoMdStats size={40} />}
        />
        <IconButton
          className={optionMenuClasses}
          onClick={() => navigate("/configuration")}
          aria-label="Menu settings option"
          icon={<IoMdSettings size={40} />}
        />
      </nav>
      <IconButton
        className=" !rounded-e-lg !rounded-s-none  !bg-transparent !min-w-[32px]"
        onClick={() => {
          if (visible && !visibleLocked) return;
          setVisibleLocked((old) => !old);
          setVisible(false);
        }}
        aria-label="Show menu button"
        icon={
          visible || visibleLocked ? (
            <FiChevronsLeft size={30} />
          ) : (
            <FiChevronsRight size={30} />
          )
        }
      />
    </div>
  );
}
