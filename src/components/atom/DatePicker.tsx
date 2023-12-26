import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { conf } from "../../conf";
import moment, { months, weekdays } from "moment";
import { BiCalendar } from "react-icons/bi";
import { YearSelector } from "./YearSelector";

export function DatePicker({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const onChangeYear = (year: number) => {
    setDate(moment(date).year(year).toDate());
  };

  const onChangeMonth = (month: number) => {
    setDate(moment(date).month(month).date(1).toDate());
  };

  const onChangeDay = (day: number) => {
    setDate(moment(date).date(day).toDate());
    setOpen(false);
  };

  const printDaysOfMonth = () => {
    const startDay = moment(date).startOf("month");
    const daysInMonth = moment(date).daysInMonth();
    //If its sunday, the offset will be 6, otherwise it will be the day of the week minus 1
    let offset = 6;
    if (startDay.weekday() !== 0) {
      offset = startDay.weekday() - 1;
    }

    const days = [];
    for (let i = 0; i < offset; i++) {
      days.push(<div key={`empty${i}`} className="w-[40px] h-[40px]"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div
          key={i}
          className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer hover:backdrop-brightness-90 rounded-lg"
          onClick={() => onChangeDay(i)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <InputGroup className="z-30 !w-[300px]">
      <Input
        value={moment(date).format(conf.dateInputFormat)}
        type="date"
        onChange={(e) =>
          setDate(moment(e.target.value, conf.dateInputFormat).toDate())
        }
      />
      <InputRightElement
        onClick={() => setOpen(true)}
        color="gray.300"
        fontSize="1.2em"
      >
        <BiCalendar color="gray.300" />
      </InputRightElement>
      {open && (
        <Popover isOpen={open} onClose={() => setOpen(false)}>
          <PopoverContent className="top-[45px] !w-[300px] bg-background-500">
            <PopoverHeader className="flex">
              <YearSelector year={date.getFullYear()} setYear={onChangeYear} />
              <Select
                value={date.getMonth()}
                onChange={(e) => onChangeMonth(Number(e.target.value))}
              >
                {months().map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </Select>
            </PopoverHeader>
            <PopoverBody>
              <div className="grid grid-cols-7 gap-2">
                {[...weekdays().slice(1, 7), weekdays()[0]].map(
                  (weekday, index) => (
                    <div
                      key={weekday}
                      className="w-[40px] h-[40px] flex justify-center items-center"
                    >
                      {weekday.substring(0, 2)}
                    </div>
                  )
                )}
                {printDaysOfMonth()}
              </div>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </InputGroup>
  );
}
