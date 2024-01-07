import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import React from "react";

export function CompletedIndicator({
  completedPercentage,
}: {
  completedPercentage: number;
}) {
  const getColor = () => {
    if (completedPercentage < 25) {
      return "error";
    } else if (completedPercentage < 50) {
      return "warning";
    } else if (completedPercentage < 75) {
      return "successLow";
    } else if (completedPercentage < 100) {
      return "success";
    } else {
      return "teal";
    }
  };

  return (
    <CircularProgress
      value={completedPercentage}
      size={75}
      color={getColor()}
      trackColor="transparent"
            className="w-fit "
    >
      <CircularProgressLabel
        className="!text-lg font-bold"
        color={getColor()}
      >{`${completedPercentage}%`}</CircularProgressLabel>
    </CircularProgress>
  );
}
