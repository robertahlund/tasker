import React, { FC } from "react";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { format } from "date-fns";
import {monthFormat, weekFormat, yearFormat} from "../../constants/constants";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import "./DateSelector.css";

interface DateSelectorProps {
  date: Date;
  isMonth: boolean;
  incrementMonth: () => void;
  decrementMonth: () => void;
  incrementWeek: () => void;
  decrementWeek: () => void;
}

const DateSelector: FC<DateSelectorProps> = ({
  date,
  isMonth,
  incrementMonth,
  decrementMonth,
  incrementWeek,
  decrementWeek
}) => (
  <div className="date-selector">
    <span
      className="date-selector__icon"
      onClick={isMonth ? decrementMonth : decrementWeek}
    >
      <ArrowLeftIcon width="24px" height="24px" />
    </span>
    {format(date, isMonth ? monthFormat + " "  + yearFormat : "'Week' " + weekFormat)}
    <span
      className="date-selector__icon"
      onClick={isMonth ? incrementMonth : incrementWeek}
    >
      <ArrowRightIcon width="24px" height="24px" />
    </span>
  </div>
);

export default DateSelector;
