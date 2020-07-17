import React, { FC, ReactNode, useEffect, useState } from "react";
import "./Tasks.css";
import SectionTitle from "../generic/SectionTitle";
import {
  addDays,
  addMonths,
  addWeeks,
  format,
  getDaysInMonth,
  startOfMonth,
  startOfWeek
} from "date-fns";
import { monthFormat, weekFormat, yearFormat } from "../../constants/constants";
import DateSelector from "../generic/DateSelector";
import TaskFilter from "./TaskFilter";
import { TaskFilter as TaskFilterEnum } from "../../enums/enums";
import TaskItem from "./TaskItem";

interface TasksProps {}

const Tasks: FC<TasksProps> = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfMonth(new Date())
  );
  const [selectedTaskFilter, setSelectedTaskFilter] = useState<TaskFilterEnum>(
    TaskFilterEnum.Month
  );

  useEffect(() => {
    document.title = "Tasks";
  }, []);

  const incrementMonth = (): void => {
    setSelectedDate((previousSelectedDate: Date) =>
      startOfMonth(addMonths(previousSelectedDate, 1))
    );
  };

  const decrementMonth = (): void => {
    setSelectedDate((previousSelectedDate: Date) =>
      startOfMonth(addMonths(previousSelectedDate, -1))
    );
  };

  const incrementWeek = (): void => {
    setSelectedDate((previousSelectedDate: Date) =>
      startOfWeek(addWeeks(previousSelectedDate, 1))
    );
  };

  const decrementMWeek = (): void => {
    setSelectedDate((previousSelectedDate: Date) =>
      startOfWeek(addWeeks(previousSelectedDate, -1))
    );
  };

  const taskFilterChange = (taskFilter: TaskFilterEnum): void => {
    setSelectedTaskFilter(taskFilter);
    if (taskFilter === TaskFilterEnum.Month) {
      setSelectedDate(startOfMonth(selectedDate));
    } else {
      setSelectedDate(startOfWeek(new Date()));
    }
  };

  const buildTaskItems = (): ReactNode[] => {
    const taskItems: ReactNode[] = [];
    if (selectedTaskFilter === TaskFilterEnum.Month) {
      for (let i = 0; i < getDaysInMonth(selectedDate); i++) {
        taskItems.push(<TaskItem date={addDays(selectedDate, i)} key={i}/>);
      }
    } else {
      for (let i = 1; i <= 7; i++) {
        taskItems.push(<TaskItem date={addDays(selectedDate, i)} key={i}/>);
      }
    }

    return taskItems;
  };

  return (
    <main className="main-section tasks">
      <div className="tasks-header">
        <SectionTitle
          title={`Tasks for ${format(
            selectedDate,
            selectedTaskFilter === TaskFilterEnum.Month
              ? monthFormat + " " + yearFormat
              : "'Week' " + weekFormat
          )}`}
        />
        <div className="tasks-filter-container">
          <DateSelector
            date={selectedDate}
            isMonth={selectedTaskFilter === TaskFilterEnum.Month}
            decrementMonth={decrementMonth}
            decrementWeek={decrementMWeek}
            incrementMonth={incrementMonth}
            incrementWeek={incrementWeek}
          />
          <TaskFilter
            selectedTaskItem={selectedTaskFilter}
            onTaskFilterChange={taskFilterChange}
          />
        </div>
      </div>
      <div className="tasks-container">{buildTaskItems()}</div>
    </main>
  );
};

export default Tasks;
