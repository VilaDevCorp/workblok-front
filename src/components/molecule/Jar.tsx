import { IconButton, useTheme } from "@chakra-ui/react";
import { useMemo, useId, useState, useEffect, useRef } from "react";
import { BiInfoCircle } from "react-icons/bi";
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
  tag,
}: {
  size: number;
  time: number;
  passedTime?: number;
  distractionMinutes?: number;
  onClick?: () => void;
  isSelected?: boolean;
  blockId?: string;
  finishBlock?: () => void;
  tag?: string;
}) {
  const { user } = useAuth();
  const theme = useTheme();

  const firstRender = useRef(true);
  const getPercentageOffset = (percentage: number) => {
    if (percentage === 0) return 0;
    if (percentage < 5) return percentage + 2;
    return percentage + 5;
  };

  const getFilledPercentage = () => {
    return ((passedTime - distractionMinutes * 60) / (time * 60)) * 100;
  };

  const getBgColor = () => {
    const maxValue = Math.max(time, passedTime / 60 - distractionMinutes);
    if (maxValue < 30) return "#45bd98";
    if (maxValue < 60) return "#55a1a4";
    if (maxValue < 90) return "#6c73b4";
    if (maxValue < 120) return "#7d54c0";
    return "#8f32cd";
  };

  const [lastPercentageCheck, setLastPercentageCheck] =
    useState<number>(passedTime);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);

  useEffect(() => {
    setLastPercentageCheck(passedTime);
  }, [distractionMinutes]);

  useEffect(() => {
    if (passedTime >= lastPercentageCheck + 20) {
      setLastPercentageCheck(passedTime);
    }
  }, [passedTime]);

  const filledPercentage = useMemo(
    () => getFilledPercentage(),
    [lastPercentageCheck, firstRender.current, time]
  );

  const id = useId();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    //If the user has allowed exceeded time and the time has passed, finish the block
    if (user?.config.exceededTime) {
      //If the exceeded time is allowed, check if the limit time has been reached
      const timeLimit = user?.config.timeLimit
        ? user?.config.timeLimit
        : conf.defaultUserConfig.timeLimit!;
      if (passedTime - distractionMinutes * 60 >= timeLimit * 60) {
        finishBlock && finishBlock();
      }
    } else {
      //If the exceeded time is not allowed, check if the block has been finished
      if (passedTime - distractionMinutes * 60 >= time * 60) {
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
          className={`!absolute !bg-transparent opacity-25 hover:opacity-100  
          rounded-full !w-[30px] !h-[30px] !min-w-[30px] !min-h-[30px] !top-[10%] !z-10 !right-[50%]
          translate-x-[50%] !text-primary-500`}
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
            d={`M${size * 3},${size * 2}H${0}v${
              (-(size * 2) / 100) * getPercentageOffset(filledPercentage)
            }c${size / 2},0,${size / 2},5,${size},5s${size / 2}-5,${size}-5,${
              size / 2
            },5,${size},5Z`}
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

        {tag && (
          <text
            y={"35%"}
            x={"50%"}
            z={1000}
            textAnchor="middle"
            alignmentBaseline="middle"
            stroke={theme.colors.primary[900]}
            fill={theme.colors.primary[900]}
            fontFamily="Urbanist, sans-serif"
            style={{
              wordWrap: "break-word",
              wordBreak: "break-all",
              fontWeight: "normal",
              width: "100%",
              padding: "0 10%",
              fontSize: "1rem",
            }}
          >
            {tag.length > (size < 100 ? 7 : 10)
              ? `${tag.substring(0, size < 100 ? 7 : 10)}...`
              : tag}
          </text>
        )}

        <text
          y={"50%"}
          x={"50%"}
          z={1000}
          fontFamily="Urbanist, sans-serif"
          textAnchor="middle"
          alignmentBaseline="middle"
          stroke={theme.colors.primary[900]}
          fill={theme.colors.primary[900]}
          style={{
            wordWrap: "break-word",
            fontWeight: "bold",
            width: "100%",
            padding: "0 10%",
            fontSize: "1.3rem",
          }}
        >{`${
          passedTime - distractionMinutes * 60 > time * 60
            ? Math.floor(passedTime / 60) - distractionMinutes
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
              fontFamily="Urbanist, sans-serif"
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
