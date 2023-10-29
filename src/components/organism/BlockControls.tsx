import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Jar } from "../atom/Jar";
import { BiMinus, BiPlay, BiStop } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useApi } from "../../hooks/useApi";
import moment from "moment";
import { Block } from "../../types/entities";
import { Typography } from "../atom/Typography";

export function BlockControls({}: {}) {
  const [time, setTime] = useState(25);
  const [activeBlock, setActiveBlock] = useState<Block | undefined>(undefined);
  const [currentTime, setCurrentTime] = useState<Date>();
  const { searchBlocks, createBlock, finishBlock, applyPenalty } = useApi();
  const today = moment().startOf("day").toDate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [resultBlock, setResultBlock] = useState<Block | undefined>(undefined);

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
          startDate: today,
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
      },
    });

  const { isLoading: isLoadingStartBlock, mutate: onStartBlock } = useMutation({
    mutationFn: () => createBlock({ targetMinutes: time }),
    onSuccess: () => {
      reloadActiveBlock();
    },
  });

  const { isLoading: isLoadingFinishBlock, mutate: onFinishBlock } =
    useMutation({
      mutationFn: (blockId: string) => finishBlock(blockId),
      onSuccess: () => {
        if (activeBlock) {
          onOpenResultModal(activeBlock);
        }
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

  const onOpenResultModal = (block: Block) => {
    setIsResultModalOpen(true);
    setResultBlock(block);
  };

  const onCloseResultModal = () => {
    setIsResultModalOpen(false);
    setResultBlock(undefined);
  };

  const isCompletedBlock =
    activeBlock &&
    moment(activeBlock?.creationDate)
      .add(
        activeBlock.targetMinutes +
          (activeBlock.distractionMinutes ? activeBlock.distractionMinutes : 0),
        "minute"
      )
      .diff(currentTime, "second") <= 0;

  const remainingHours =
    activeBlock !== undefined
      ? Math.floor(
          Math.abs(
            moment(activeBlock?.creationDate)
              .add(
                activeBlock.targetMinutes +
                  (activeBlock.distractionMinutes
                    ? activeBlock.distractionMinutes
                    : 0),
                "minute"
              )
              .diff(currentTime, "second") / 3600
          )
        )
      : 0;

  const remainingMinutes =
    activeBlock !== undefined
      ? Math.floor(
          Math.abs(
            (moment(activeBlock?.creationDate)
              .add(
                activeBlock.targetMinutes +
                  (activeBlock.distractionMinutes
                    ? activeBlock.distractionMinutes
                    : 0),
                "minute"
              )
              .diff(currentTime, "second") %
              3600) /
              60
          )
        )
      : 0;
  const remainingSeconds =
    activeBlock !== undefined
      ? Math.abs(
          moment(activeBlock.creationDate)
            .add(
              activeBlock.targetMinutes +
                (activeBlock.distractionMinutes
                  ? activeBlock.distractionMinutes
                  : 0),
              "minute"
            )
            .diff(currentTime, "second") % 60
        )
      : 0;

  return (
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
              time={activeBlock.targetMinutes}
              passedTime={moment(currentTime).diff(
                moment(activeBlock.creationDate),
                "minute"
              )}
              distractionMinutes={activeBlock.distractionMinutes}
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
                  ${activeBlock.targetMinutes % 60} min 00 sec`
                : `${isCompletedBlock ? "+" : ""}${
                    remainingHours > 0 ? `${remainingHours} h ` : ""
                  } 
                  ${remainingMinutes > 0 ? `${remainingMinutes} min ` : ""}${
                    remainingSeconds !== undefined &&
                    (remainingSeconds < 10
                      ? "0" + remainingSeconds
                      : remainingSeconds)
                  } sec`}
            </Typography>
            <div className="flex gap-4 justify-center">
              <Button
                className="w-fit"
                onClick={() => onFinishBlock(activeBlock.id)}
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
                {"5 min"}
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
                {"1 min"}
              </Button>
            </div>
          </>
        ) : (
          <>
            <Jar size={100} time={time} passedTime={0} />
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
      <Modal isOpen={isResultModalOpen} onClose={() => onCloseResultModal()}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button onClick={() => onCloseResultModal()}>{"Return"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
