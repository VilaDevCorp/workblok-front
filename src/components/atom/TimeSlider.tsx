import {
  SliderFilledTrack,
  SliderTrack,
  Slider as ChakraSlider,
  SliderThumb,
} from "@chakra-ui/react";
import React from "react";
import { Typography } from "./Typography";
import {
  getTimeInHoursMinutesSeconds,
  getTimeInHoursMinutesSecondsString,
} from "../../utils/utilFunctions";

export function TimeSlider({
  value,
  setValue,
}: {
  value: number;
  setValue: (value: number) => void;
}) {
  const { hours, minutes, seconds } = getTimeInHoursMinutesSeconds(value * 60);

  return (
    <div className="flex flex-col items-center gap-4">
      <ChakraSlider
        aria-label="daily-target-slider"
        min={0}
        step={5}
        onChange={(value) => setValue(value)}
        value={value}
        max={1440}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </ChakraSlider>
      <Typography mode="subtitle">
        {value === 0
          ? "0 m"
          : getTimeInHoursMinutesSecondsString(hours, minutes, seconds)}
      </Typography>
    </div>
  );
}
