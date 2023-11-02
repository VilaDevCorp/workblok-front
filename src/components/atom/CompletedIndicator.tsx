import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import React from "react";

export function CompletedIndicator({
  completedPercentage,
}: {
  completedPercentage: number;
}) {
  const getColor = () => {
    if (completedPercentage < 25) {
      return "red";
    } else if (completedPercentage < 50) {
      return "orange";
    } else if (completedPercentage < 75) {
      return "yellow";
    } else if (completedPercentage < 100) {
      return "green";
    } else {
      return "teal";
    }
  };

  return (
    <CircularProgress
      value={completedPercentage}
      size={75}
      color={getColor()}
      className="w-fit "
    >
      <CircularProgressLabel
        className="!text-lg font-bold"
        color={getColor()}
      >{`${completedPercentage}%`}</CircularProgressLabel>
    </CircularProgress>
  );
}
