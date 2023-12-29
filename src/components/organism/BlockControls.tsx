import {
  Button,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Jar } from "../molecule/Jar";
import { BiMinus, BiPlay, BiStop } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "../../hooks/useApi";
import moment from "moment";
import { Block } from "../../types/entities";
import { Typography } from "../atom/Typography";
import { useApiError } from "../../hooks/useApiError";
import { useNavigate } from "react-router-dom";
import {
  getTimeInHoursMinutesSeconds,
  getTimeInHoursMinutesSecondsString,
} from "../../utils/utilFunctions";
import { useAuth } from "../../hooks/useAuth";
import { DetailsModal } from "../../modals/DetailsModal";

export function BlockControls({}: {}) {
  const [time, setTime] = useState(25);
  const [activeBlock, setActiveBlock] = useState<Block | undefined>(undefined);
  const [currentTime, setCurrentTime] = useState<Date>();
  const { searchBlocks, createBlock, finishBlock, applyPenalty } = useApi();
  const today = moment().startOf("day").toDate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [resultBlockId, setResultBlockId] = useState<string | undefined>(
    undefined
  );
  const navigation = useNavigate();
  const { setError } = useApiError(navigation);
  const [tag, setTag] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => onAddSecond(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const onAddSecond = () => {
    setCurrentTime(new Date());
  };

  const { refetch: reloadActiveBlock, isLoading: isLoadingActiveBlock } =
    useQuery({
      queryKey: ["getActiveBlock"],
      queryFn: () =>
        searchBlocks({
          page: 0,
          pageSize: 0,
          isActive: true,
        }),
      onSuccess: (data) => {
        if (data.content.length > 0) {
          setActiveBlock(data.content[0]);
        } else {
          setActiveBlock(undefined);
        }
      },
      onError: (err) => {
        toast({
          title: "Error obtaining your blocks",
          status: "error",
          duration: 5000,
        });
        setError(err as Error);
      },
    });

  const { isLoading: isLoadingStartBlock, mutate: onStartBlock } = useMutation({
    mutationFn: () => createBlock({ targetMinutes: time, tag }),
    onSuccess: () => {
      reloadActiveBlock();
    },
  });

  const { isLoading: isLoadingFinishBlock, mutate: onFinishBlock } =
    useMutation({
      mutationFn: ({ blockId, auto }: { blockId: string; auto?: boolean }) =>
        finishBlock(blockId, auto),
      onSuccess: () => {
        setResultBlockId(activeBlock?.id);
        reloadActiveBlock();
        queryClient.invalidateQueries(["getFinishedBlocks"]);
      },
    });

  const { isLoading: isLoadingPenalty, mutate: onApplyPenalty } = useMutation({
    mutationFn: (penaltyMinutes: number) =>
      applyPenalty({
        blockId: activeBlock?.id || "",
        distractionMinutes: penaltyMinutes,
      }),
    onSuccess: () => {
      reloadActiveBlock();
    },
  });

  const isCompletedBlock =
    activeBlock &&
    moment(activeBlock?.creationDate)
      .add(
        activeBlock.targetMinutes +
          (activeBlock.distractionMinutes ? activeBlock.distractionMinutes : 0),
        "minute"
      )
      .diff(currentTime, "second") <= 0;

  const {
    hours: remainingHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds,
  } = activeBlock !== undefined
    ? getTimeInHoursMinutesSeconds(
        moment(activeBlock?.creationDate)
          .add(
            activeBlock.targetMinutes +
              (activeBlock.distractionMinutes
                ? activeBlock.distractionMinutes
                : 0),
            "minute"
          )
          .diff(currentTime, "second")
      )
    : { hours: 0, minutes: 0, seconds: 0 };

  return (
    <div className="flex gap-2 flex-col items-center">
      {!activeBlock && (
        <Select
          maxWidth={350}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value={""}>{"No tag"}</option>
          {user?.config.tags?.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </Select>
      )}
      <div className="flex justify-center items-center gap-8 ">
        {!activeBlock && (
          <Slider
            className="!h-[150px]"
            max={120}
            min={5}
            step={5}
            orientation="vertical"
            value={time}
            onChange={(value) => setTime(value)}
          >
            <SliderTrack className="!w-[10px] ">
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb className="!w-[20px] !h-[20px]" />
          </Slider>
        )}

        <div className="flex flex-col gap-4 justify-center items-center">
          {activeBlock ? (
            <>
              <Jar
                size={100}
                key={`jar_${activeBlock.id}`}
                blockId={activeBlock.id}
                time={activeBlock.targetMinutes}
                passedTime={moment(currentTime).diff(
                  moment(activeBlock.creationDate),
                  "second"
                )}
                distractionMinutes={activeBlock.distractionMinutes}
                finishBlock={() =>
                  onFinishBlock({ blockId: activeBlock.id, auto: true })
                }
                tag={activeBlock.tag}
              />
              <Typography className="text-primary-600 text-lg font-bold">
                {/* This is to avoid discrepancies between the time in the server
              and the time in the client */}
                {moment(currentTime).isBefore(activeBlock.creationDate)
                  ? `${
                      Math.floor(activeBlock.targetMinutes / 60) > 0
                        ? `${Math.floor(activeBlock.targetMinutes / 60)} h `
                        : ""
                    }
                  ${activeBlock.targetMinutes % 60} m`
                  : `${isCompletedBlock ? "+" : ""}
                ${getTimeInHoursMinutesSecondsString(
                  remainingHours,
                  remainingMinutes,
                  remainingSeconds
                )}
                `}
              </Typography>
              <div className="flex gap-4 justify-center">
                <Button
                  className="w-fit"
                  onClick={() => onFinishBlock({ blockId: activeBlock.id })}
                  leftIcon={<BiStop />}
                >
                  {"Finish"}
                </Button>
                <Button
                  leftIcon={<BiMinus />}
                  isDisabled={
                    !isCompletedBlock &&
                    activeBlock.targetMinutes - remainingMinutes <= 5
                  }
                  className="!border-error border !text-error !"
                  onClick={() =>
                    onApplyPenalty(
                      (activeBlock.distractionMinutes
                        ? activeBlock.distractionMinutes
                        : 0) + 5
                    )
                  }
                >
                  {"5 m"}
                </Button>
                <Button
                  leftIcon={<BiMinus />}
                  isDisabled={
                    !isCompletedBlock &&
                    activeBlock.targetMinutes - remainingMinutes <= 1
                  }
                  className="!border-error border !text-error !"
                  onClick={() =>
                    onApplyPenalty(
                      (activeBlock.distractionMinutes
                        ? activeBlock.distractionMinutes
                        : 0) + 1
                    )
                  }
                >
                  {"1 m"}
                </Button>
              </div>
            </>
          ) : (
            <>
              <Jar
                key={`jar_selector`}
                size={100}
                time={time}
                passedTime={time * 60}
                tag={tag}
              />
              <Button
                className="w-fit"
                onClick={() => onStartBlock()}
                leftIcon={<BiPlay />}
              >
                {"Start"}
              </Button>
            </>
          )}
        </div>
        {resultBlockId && (
          <DetailsModal
            blockId={resultBlockId}
            onClose={() => setResultBlockId(undefined)}
            justCompleted={true}
          />
        )}
      </div>
    </div>
  );
}
