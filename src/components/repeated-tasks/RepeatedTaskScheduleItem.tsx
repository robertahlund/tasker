import React, {FC} from "react";
import "./RepeatedTaskScheduleItem.css";
import {RepeatedTaskType} from "../../enums/enums";

interface RepeatedTaskScheduleItemProps {
  value: RepeatedTaskType;
  active: boolean;
  handleScheduleChange: (
    scheduleId: RepeatedTaskType,
    scheduleDays: number[]
  ) => void;
}

const RepeatedTaskScheduleItem: FC<RepeatedTaskScheduleItemProps> = ({
  value,
  active,
  handleScheduleChange
}) => {
  const handleOnScheduleClick = (): void => {
    let localScheduleDays: number[] = [];
    if (value === RepeatedTaskType.EveryDay) {
      localScheduleDays = [1, 2, 3, 4, 5, 6, 7];
    } else if (value === RepeatedTaskType.WeekDays) {
      localScheduleDays = [1, 2, 3, 4, 5];
    } else if (value === RepeatedTaskType.Weekends) {
      localScheduleDays = [6, 7];
    } else {
      localScheduleDays = [];
    }
    handleScheduleChange(value, localScheduleDays);
  };

  return (
    <div
      className={`repeated-task-schedule-item ${
        active ? "repeated-task-schedule-item__active" : ""
      }`}
      onClick={handleOnScheduleClick}
    >
      <span>{value}</span>
    </div>
  );
};

export default RepeatedTaskScheduleItem;
