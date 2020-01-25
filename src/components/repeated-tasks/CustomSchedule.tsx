import React, {FC} from "react";
import "./CustomSchedule.css";
import {WeekDays} from "../../enums/enums";
import {WeekDayAbbreviation} from "../../types/types";
import {motion} from "framer-motion";

interface CustomScheduleProps {
  weekDayId: WeekDays;
  weekDay: WeekDayAbbreviation;
  active: boolean;
  handleCustomScheduleDaysChange: (scheduleDays: number[]) => void;
  scheduleDays: number[];
}

const CustomSchedule: FC<CustomScheduleProps> = ({
  weekDayId,
  weekDay,
  active,
  handleCustomScheduleDaysChange,
  scheduleDays
}) => {
  const customScheduleChange = (): void => {
    const index: number = scheduleDays.indexOf(weekDayId);
    const alreadyExists: boolean = index > -1;
    if (alreadyExists) {
      handleCustomScheduleDaysChange(
        scheduleDays.filter(dayId => dayId !== weekDayId).sort()
      );
    } else {
      handleCustomScheduleDaysChange([...scheduleDays, weekDayId].sort());
    }
  };

  return (
    <motion.span
      className={`repeated-task-schedule-custom-item ${
        active ? "repeated-task-schedule-custom-item__active" : ""
      }`}
      onClick={customScheduleChange}
      animate={{opacity: 1}}
      initial={{opacity: 0}}
      exit={{opacity: 0}}
      transition={{duration: 0.3}}
    >
      {weekDay}
    </motion.span>
  );
};

export default CustomSchedule;
