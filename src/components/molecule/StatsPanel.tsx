import React from "react";
import { StatsResult } from "../../types/entities";
import {
  getTimeInHoursMinutesSeconds,
  getTimeInHoursMinutesSecondsString,
} from "../../utils/utilFunctions";
import { StatData } from "../atom/StatData";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export function StatsPanel({ statsData }: { statsData?: StatsResult }) {
  const {
    hours: workingHours,
    minutes: workingMinutes,
    seconds: workingSeconds,
  } = statsData?.workingTime
    ? getTimeInHoursMinutesSeconds(statsData?.workingTime)
    : { hours: 0, minutes: 0, seconds: 0 };

  const {
    hours: distractionHours,
    minutes: distractionMinutes,
    seconds: distractionSeconds,
  } = statsData?.distractionTime
    ? getTimeInHoursMinutesSeconds(statsData?.distractionTime)
    : { hours: 0, minutes: 0, seconds: 0 };

  const distractionPercentage = statsData?.distractionTime
    ? Math.floor(
        (statsData?.distractionTime /
          (statsData.workingTime + statsData.distractionTime)) *
          100
      )
    : 0;

  const {
    hours: dailyWorkingHours,
    minutes: dailyWorkingMinutes,
    seconds: dailyWorkingSeconds,
  } = statsData?.dailyAvgWorkingTime
    ? getTimeInHoursMinutesSeconds(statsData?.dailyAvgWorkingTime)
    : { hours: 0, minutes: 0, seconds: 0 };

  const {
    hours: dailyDistractionHours,
    minutes: dailyDistractionMinutes,
    seconds: dailyDistractionSeconds,
  } = statsData?.dailyAvgDistractionTime
    ? getTimeInHoursMinutesSeconds(statsData?.dailyAvgDistractionTime)
    : { hours: 0, minutes: 0, seconds: 0 };

  return (
    <div>
      <StatData
        label={"Working: "}
        value={getTimeInHoursMinutesSecondsString(
          workingHours,
          workingMinutes,
          workingSeconds
        )}
      />
      <StatData
        label="Distraction"
        value={
          <div className="flex gap-4 items-center font-bold">
            <span className="text-lg font-bold">
              {`${getTimeInHoursMinutesSecondsString(
                distractionHours,
                distractionMinutes,
                distractionSeconds
              )}`}
            </span>

            <span
              className={`${distractionPercentage > 0 && "text-error"} text-lg`}
            >{`${distractionPercentage}%`}</span>
          </div>
        }
      />

      <StatData
        label={"Daily working: "}
        value={getTimeInHoursMinutesSecondsString(
          dailyWorkingHours,
          dailyWorkingMinutes,
          dailyWorkingSeconds
        )}
      />
      <StatData
        label={"Daily distraction: "}
        value={getTimeInHoursMinutesSecondsString(
          dailyDistractionHours,
          dailyDistractionMinutes,
          dailyDistractionSeconds
        )}
      />
    </div>
  );
}
