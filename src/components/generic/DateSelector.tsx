import React, { FC } from "react";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import { format } from "date-fns";
import { monthFormat, weekFormat, yearFormat } from "../../constants/constants";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import "./DateSelector.css";

interface DateSelectorProps {
  date: Date;
  isMonth: boolean;
  incrementMonth: () => void;
  decrementMonth: () => void;
  incrementWeek: () => void;
  decrementWeek: () => void;
  resetDate: () => void;
}

const DateSelector: FC<DateSelectorProps> = ({
  date,
  isMonth,
  incrementMonth,
  decrementMonth,
  incrementWeek,
  decrementWeek,
  resetDate,
}) => (
  <div className="date-selector">
    <span
      className="date-selector__icon"
      onClick={isMonth ? decrementMonth : decrementWeek}
    >
      <ArrowLeftIcon width="24px" height="24px" />
    </span>
    <span className="date-selector__text" onClick={resetDate}>
      {format(
        date,
        isMonth ? monthFormat + " " + yearFormat : "'Week' " + weekFormat
      )}
    </span>
    <span
      className="date-selector__icon"
      onClick={isMonth ? incrementMonth : incrementWeek}
    >
      <ArrowRightIcon width="24px" height="24px" />
    </span>
  </div>
);

export default DateSelector;
