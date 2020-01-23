import React, { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import "./RepeatedTaskEdit.css";
import TextArea from "../generic/TextArea";
import Button from "../generic/Button";
import { RepeatedTaskFormValues } from "../../types/types";
import { RepeatedTaskType } from "../../enums/enums";
import RepeatedTaskSchedule from "./RepeatedTaskSchedule";
import {createOrUpdateRepeatedTask} from "../../api/repeatableTasks";

interface RepeatableTaskEditProps {
  repeatedTaskId: string;
}

const RepeatedTaskEdit: FC<RepeatableTaskEditProps> = ({ repeatedTaskId }) => {
  const [repeatedTaskForm, setRepeatedTaskForm] = useState<
    RepeatedTaskFormValues
  >({
    id: repeatedTaskId,
    content: {
      value: "",
      valid: true,
      validationMessage: ""
    },
    schedule: RepeatedTaskType.EveryDay,
    scheduleDays: [1, 2, 3, 4, 5, 6, 7]
  });

  const handleTextAreaChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setRepeatedTaskForm({
      ...repeatedTaskForm,
      content: {
        ...repeatedTaskForm.content,
        value: event.target.value
      }
    });
  };

  const handleScheduleChange = (
    scheduleId: RepeatedTaskType,
    scheduleDays: number[]
  ): void => {
    setRepeatedTaskForm({
      ...repeatedTaskForm,
      schedule: scheduleId,
      scheduleDays: scheduleDays
    });
  };

  const handleCustomScheduleDaysChange = (scheduleDays: number[]): void => {
    setRepeatedTaskForm({
      ...repeatedTaskForm,
      scheduleDays: scheduleDays
    });
  };

  const createRepeatedTask = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();
    await createOrUpdateRepeatedTask({
      id: repeatedTaskId,
      content: repeatedTaskForm.content.value,
      createdAt: new Date(),
      createdAtFormatted: "23 Jan, 2020",
      schedule: repeatedTaskForm.schedule,
      scheduleDays: repeatedTaskForm.scheduleDays
    })
  };

  return (
    <div className="repeated-tasks-edit-wrapper">
      <h2 className="repeated-tasks-edit-heading">
        {repeatedTaskId ? "Edit repeated task" : "Create new repeated task"}
      </h2>
      <form className="repeated-tasks-edit-form">
        <TextArea
          id="content"
          value={repeatedTaskForm.content.value}
          onInputChange={handleTextAreaChange}
          name="content"
          valid={repeatedTaskForm.content.valid}
          validationMessage={repeatedTaskForm.content.validationMessage}
          labelValue="Content"
          rows={5}
        />
        <RepeatedTaskSchedule
          selectedTaskSchedule={repeatedTaskForm.schedule}
          handleScheduleChange={handleScheduleChange}
          selectedScheduleDays={repeatedTaskForm.scheduleDays}
          handleCustomScheduleDaysChange={handleCustomScheduleDaysChange}
        />
        <Button type="button" text="Save" onSubmit={createRepeatedTask} />
      </form>
    </div>
  );
};

export default RepeatedTaskEdit;
