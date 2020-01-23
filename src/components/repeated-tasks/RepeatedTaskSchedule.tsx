import React, { FC, ReactNode } from "react";
import { RepeatedTaskType, WeekDays } from "../../enums/enums";
import "./RepeatedTaskSchedule.css";
import RepeatedTaskScheduleItem from "./RepeatedTaskScheduleItem";
import CustomSchedule from "./CustomSchedule";
import { WeekDayAbbreviation } from "../../types/types";
import { AnimatePresence, motion } from "framer-motion";

interface RepeatedTaskScheduleProps {
  selectedTaskSchedule: RepeatedTaskType;
  handleScheduleChange: (
    scheduleId: RepeatedTaskType,
    scheduleDays: number[]
  ) => void;
  selectedScheduleDays: number[];
  handleCustomScheduleDaysChange: (scheduleDays: number[]) => void;
}

const RepeatedTaskSchedule: FC<RepeatedTaskScheduleProps> = ({
  selectedTaskSchedule,
  handleScheduleChange,
  selectedScheduleDays,
  handleCustomScheduleDaysChange
}) => {
  const buildTaskSchedule = (): ReactNode[] => {
    const repeatedTaskScheduleItems: ReactNode[] = [];
    let repeatedTaskTypeKey: keyof typeof RepeatedTaskType;
    for (repeatedTaskTypeKey in RepeatedTaskType) {
      if (RepeatedTaskType.hasOwnProperty(repeatedTaskTypeKey)) {
        repeatedTaskScheduleItems.push(
          <RepeatedTaskScheduleItem
            key={repeatedTaskTypeKey}
            value={RepeatedTaskType[repeatedTaskTypeKey]}
            active={
              selectedTaskSchedule === RepeatedTaskType[repeatedTaskTypeKey]
            }
            handleScheduleChange={handleScheduleChange}
          />
        );
      }
    }
    return repeatedTaskScheduleItems;
  };

  const buildCustomSchedule = (): ReactNode[] => {
    const customScheduleItems: ReactNode[] = [];
    for (let weekDayKey in WeekDays) {
      if (WeekDays.hasOwnProperty(weekDayKey) && isNaN(Number(weekDayKey))) {
        customScheduleItems.push(
          <CustomSchedule
            key={weekDayKey}
            scheduleDays={selectedScheduleDays}
            handleCustomScheduleDaysChange={handleCustomScheduleDaysChange}
            weekDayId={(WeekDays[weekDayKey] as unknown) as number}
            weekDay={weekDayKey.substr(0, 3) as WeekDayAbbreviation}
            active={
              selectedScheduleDays.indexOf(
                (WeekDays[weekDayKey] as unknown) as number
              ) > -1
            }
          />
        );
      }
    }
    return customScheduleItems;
  };

  return (
    <div className="repeated-task-schedule-container">
      <label className="repeated-task-schedule-label">Schedule</label>
      {buildTaskSchedule()}
      <AnimatePresence>
        {selectedTaskSchedule === RepeatedTaskType.Custom && (
          <div className="repeated-task-schedule-custom-container">
            {buildCustomSchedule()}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RepeatedTaskSchedule;
