import { IconButton } from "@chakra-ui/react";
import React, { useMemo, useId, useState, useEffect } from "react";
import { BiInfoCircle, BiPlus } from "react-icons/bi";
import { IoIosInformation } from "react-icons/io";
import { DetailsModal } from "../../modals/DetailsModal";
import { useAuth } from "../../hooks/useAuth";
import { conf } from "../../conf";

export function Jar({
  size = 100,
  time = 25,
  passedTime = 0,
  distractionMinutes = 0,
  onClick,
  isSelected,
  blockId,
  finishBlock,
}: {
  size: number;
  time: number;
  passedTime?: number;
  distractionMinutes?: number;
  onClick?: () => void;
  isSelected?: boolean;
  blockId?: string;
  finishBlock?: () => void;
}) {
  const { user } = useAuth();
  const getPercentageOffset = (percentage: number) => {
    if (percentage === 0) return 0;
    if (percentage < 5) return percentage + 2;
    if (percentage > 5) return percentage + 2;
    return percentage + 5;
  };

  const getFilledPercentage = () => {
    return ((passedTime - distractionMinutes) / time) * 100;
  };

  const getBgColor = () => {
    const maxValue = Math.max(time, passedTime - distractionMinutes);
    if (maxValue < 30) return "#45bd98";
    if (maxValue < 60) return "#55a1a4";
    if (maxValue < 90) return "#6c73b4";
    if (maxValue < 120) return "#7d54c0";
    return "#8f32cd";
  };

  const filledPercentage = useMemo(
    () => getFilledPercentage(),
    [passedTime, distractionMinutes]
  );

  const id = useId();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    //If the user has allowed exceeded time and the time has passed, finish the block
    if (user?.config.exceededTime) {
      //If the exceeded time is allowed, check if the limit time has been reached
      const timeLImit = user?.config.timeLimit
        ? user?.config.timeLimit
        : conf.defaultUserConfig.timeLimit!;
      if (passedTime - distractionMinutes >= timeLImit) {
        finishBlock && finishBlock();
      }
    } else {
      //If the exceeded time is not allowed, check if the block has been finished
      if (passedTime - distractionMinutes >= time) {
        finishBlock && finishBlock();
      }
    }
  }, [passedTime]);

  return (
    <div
      className={`${onClick && "hover:backdrop-brightness-75"}
      } transition-[backdrop-filter] relative border-4 border-transparent rounded-[25px] ${
        isSelected && " !border-primary-500 backdrop-brightness-75"
      }`}
    >
      {blockId && (
        <IconButton
          onClick={() => setShowDetails(true)}
          className={`!absolute !bg-transparent opacity-25 hover:opacity-100  rounded-full !w-[30px] !h-[30px] !min-w-[30px] !min-h-[30px] !top-[10%] !z-10 !right-[50%] translate-x-[50%]`}
          aria-label="dsf"
          icon={<BiInfoCircle size={24} />}
        ></IconButton>
      )}
      <svg
        width={size}
        height={size * 2}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        onClick={onClick}
        cursor={onClick ? "pointer" : "default"}
      >
        <defs>
          <rect
            id={`tube_${id}`}
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx={size / 4}
            ry={size / 4}
          />
          <clipPath id={`liquidMask_${id}`}>
            <use xlinkHref={`#tube_${id}`} className={`liquidMask_${id}`} />
          </clipPath>
          <clipPath id={`tubeMask_${id}`}>
            <use xlinkHref={`#tube_${id}`} className={`liquidMask_${id}`} />
          </clipPath>
          <path
            id={`liquid_${id}`}
            d={`M${size * 3},${
              ((size * 2) / 100) * (100 - getPercentageOffset(filledPercentage))
            }v${
              ((size * 2) / 100) * getPercentageOffset(filledPercentage)
            }H${0}v${
              (-(size * 2) / 100) * getPercentageOffset(filledPercentage)
            }c100,0,100,5,200,5s100-5,200-5,100,5,200,5Z`}
          />
          <mask id={`gradMask_${id}`}>
            <use
              xlinkHref={`#liquid_${id}`}
              className={`liquid_${id}`}
              x="0"
              fill="grey"
            />
            <use
              xlinkHref={`#liquid_${id}`}
              className={`liquid_${id}`}
              x="0"
              fill="grey"
              opacity="0.5"
            />
          </mask>
        </defs>

        <g className={`whole_${id}`}>
          <use
            xlinkHref={`#tube_${id}`}
            className={`tubeBg_${id}`}
            fill="#C8D9D3"
            opacity="0.61"
          />
          <g mask={`url(#gradMask_${id})`}>
            <use xlinkHref={`#tube_${id}`} fill={getBgColor()} />
          </g>
        </g>

        <text
          y={"50%"}
          x={"50%"}
          z={1000}
          textAnchor="middle"
          alignmentBaseline="middle"
          stroke={"black"}
          fill={"black"}
          style={{
            wordWrap: "break-word",
            fontWeight: "bold",
            width: "100%",
            padding: "0 10%",
            fontSize: "1.3rem",
          }}
        >{`${
          passedTime - distractionMinutes > time
            ? passedTime - distractionMinutes
            : time
        }`}</text>
        {distractionMinutes && distractionMinutes > 0 && (
          <g>
            <rect
              y={0.8 * 2 * size - 15}
              x={size / 2 - 15}
              rx={100}
              width={30}
              height={30}
              fill="white"
              opacity={0.5}
            ></rect>
            <text
              textAnchor="middle"
              y={0.8 * 2 * size}
              height={20}
              alignmentBaseline="middle"
              x={"50%"}
              stroke={"red"}
              fill={"red"}
              style={{
                wordWrap: "break-word",
                width: "100%",
                padding: "0 10%",
                fontWeight: "lighter",
                fontSize: "0.8rem",
              }}
            >{`-${distractionMinutes}`}</text>
          </g>
        )}
        <line
          className={`tubeShine_${id}`}
          x1="10%"
          y1="15%"
          x2="10%"
          y2="75%"
          fill="none"
          stroke="#FFF"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="3%"
          opacity="0.21"
          strokeDasharray="50% 10%"
          strokeDashoffset="0"
        />
      </svg>
      {showDetails && blockId && (
        <DetailsModal blockId={blockId} onClose={() => setShowDetails(false)} />
      )}
    </div>
  );
}
