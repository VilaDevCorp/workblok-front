import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Block } from "../types/entities";
import { Jar } from "../components/molecule/Jar";
import moment from "moment";
import { useApi } from "../hooks/useApi";
import { useQuery } from "react-query";
import { Typography } from "../components/atom/Typography";
import {
  getTimeInHoursMinutesSeconds,
  getTimeInHoursMinutesSecondsString,
} from "../utils/utilFunctions";
import { StatData } from "../components/atom/StatData";
import { CompletedIndicator } from "../components/atom/CompletedIndicator";

export function DetailsModal({
  blockId,
  onClose,
}: {
  blockId: string;
  onClose: () => void;
}) {
  const { getBlock } = useApi();

  const { data: block } = useQuery({
    queryKey: ["getBlockInfo", blockId],
    queryFn: () => getBlock(blockId),
  });

  const finishDate = block?.finishDate ? moment(block.finishDate) : moment();

  const totalTime = block ? finishDate.diff(block.creationDate, "seconds") : 0;

  const workingTime = block
    ? finishDate
        .subtract(block.distractionMinutes, "minutes")
        .diff(block.creationDate, "seconds")
    : 0;
  const distractionTime = block ? block.distractionMinutes * 60 : 0;

  const {
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds,
  } = getTimeInHoursMinutesSeconds(totalTime);

  const {
    hours: workingHours,
    minutes: workingMinutes,
    seconds: workingSeconds,
  } = getTimeInHoursMinutesSeconds(workingTime);

  const {
    hours: distractionHours,
    minutes: distractionMinutes,
    seconds: distractionSeconds,
  } = getTimeInHoursMinutesSeconds(distractionTime);

  const completedPercentage = block
    ? Math.floor((workingTime / 60 / block.targetMinutes) * 100)
    : 0;
  const distractionPercentage = block?.distractionMinutes
    ? Math.floor((block.distractionMinutes / totalTime) * 60 * 100)
    : 0;


  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody className="flex gap-4 flex-col">
          {block ? (
            <div
              className="flex gap-4
            "
            >
              <Jar
                time={block.targetMinutes}
                distractionMinutes={block.distractionMinutes}
                passedTime={moment(block.finishDate).diff(
                  block.creationDate,
                  "minutes"
                )}
                size={100}
              />
              <div className="flex flex-col gap-4 w-full">
                <StatData
                  label="Total"
                  value={getTimeInHoursMinutesSecondsString(
                    totalHours,
                    totalMinutes,
                    totalSeconds
                  )}
                />
                <StatData
                  label="Working"
                  value={getTimeInHoursMinutesSecondsString(
                    workingHours,
                    workingMinutes,
                    workingSeconds
                  )}
                />
                <StatData
                  label="Target completion"
                  value={
                    <CompletedIndicator
                      completedPercentage={completedPercentage}
                    />
                  }
                />
                <StatData
                  label="Distraction"
                  value={
                    <div className="flex gap-4 items-center font-bold">
                      <span>
                        {`${getTimeInHoursMinutesSecondsString(
                          distractionHours,
                          distractionMinutes,
                          distractionSeconds
                        )}`}
                      </span>

                      <span
                        className={`${
                          distractionPercentage > 0 && "text-error"
                        } text-lg`}
                      >{`${distractionPercentage}%`}</span>
                    </div>
                  }
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => onClose()}>{"OK"}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
