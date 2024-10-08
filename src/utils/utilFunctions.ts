import { ApiError, ApiResponse } from "../types/types";

export const getTimeInHoursMinutesSeconds = (
  totalSeconds: number
): { hours: number; minutes: number; seconds: number } => {
  const totalSecondsAbs = Math.abs(totalSeconds);
  const hours = Math.floor(Math.abs(totalSecondsAbs / 3600));
  const minutes = Math.floor(Math.abs((totalSecondsAbs - hours * 3600) / 60));
  const seconds = Math.abs(totalSecondsAbs - hours * 3600 - minutes * 60);
  return { hours, minutes, seconds };
};

export const getTimeInHoursMinutesSecondsString = (
  hours: number,
  minutes: number,
  seconds: number
): string => {
  const hoursString = hours > 0 ? `${hours} h ` : "";
  const minutesString = minutes > 0 ? `${minutes} m ` : "";
  const secondsString = seconds > 0 ? `${seconds} s` : "";
  if (hoursString === "" && minutesString === "" && secondsString === "")
    return "0 s";
  return `${hoursString}${minutesString}${secondsString}`;
};

export const checkResponseException = (
  res: Response,
  resObject: ApiResponse<unknown>
) => {
  if (!res.ok) {
    throw new ApiError({
      statusCode: res.status,
      message: resObject.errorMessage,
      code: resObject.errorCode
    });
  }
};
