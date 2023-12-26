import { IconButton } from "@chakra-ui/react";
import React, { SetStateAction } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export function YearSelector({
  year,
  setYear,
}: {
  year: number;
  setYear: (year: number) => void;
}) {
  const controlButtonClasses = "!bg-transparent";
  return (
    <div className="w-full flex gap-2 items-center">
      <IconButton
        className={controlButtonClasses}
        aria-label="Previous year button"
        icon={<BiChevronLeft size={30} />}
        onClick={() => setYear(year - 1)}
      />
      <span className="text-xl">{year}</span>
      <IconButton
        className={controlButtonClasses}
        aria-label="Next year button"
        icon={<BiChevronRight size={30} />}
        onClick={() => setYear(year + 1)}
      />
    </div>
  );
}
