import React, {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useContext,
  useEffect,
  useState
} from "react";
import "./RepeatedTaskEdit.css";
import TextArea from "../generic/TextArea";
import Button from "../generic/Button";
import { Auth, RepeatedTask, RepeatedTaskFormValues } from "../../types/types";
import { RepeatedTaskType } from "../../enums/enums";
import RepeatedTaskSchedule from "./RepeatedTaskSchedule";
import {
  createOrUpdateRepeatedTask,
  getRepeatedTaskById
} from "../../api/repeatedTasks";
import format from "date-fns/format";
import { repeatedTaskDateFormat } from "../../constants/constants";
import { AuthenticationContext } from "../../context/authContext";
import RepeatedTaskEditIllustration from "../illustrations/RepeatedTaskEditIllustration";
import CloseIcon from "../icons/CloseIcon";

interface RepeatableTaskEditProps {
  repeatedTaskId: string;
  selectRepeatedTaskIdForEdit: (taskId: string) => void;
  refreshDataList: () => void;
  toggleModal: (
    event?: SyntheticEvent,
    shouldClose?: boolean,
    shouldOpen?: boolean
  ) => void;
}

const RepeatedTaskEdit: FC<RepeatableTaskEditProps> = ({
  repeatedTaskId,
  selectRepeatedTaskIdForEdit,
  refreshDataList,
  toggleModal
}) => {
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
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [repeatedTaskCreatedDate, setRepeatedTaskCreatedDate] = useState<Date>(
    new Date()
  );

  const { uid }: { uid: string } = useContext<Auth>(AuthenticationContext);

  useEffect(() => {
    if (repeatedTaskId) {
      (async (): Promise<void> => {
        const repeatedTask: RepeatedTask = await getRepeatedTaskById(
          repeatedTaskId
        );
        setRepeatedTaskForm({
          id: repeatedTask.id,
          content: {
            value: repeatedTask.content,
            valid: true,
            validationMessage: ""
          },
          schedule: repeatedTask.schedule,
          scheduleDays: repeatedTask.scheduleDays
        });
        setRepeatedTaskCreatedDate(repeatedTask.createdAt);
      })();
    }
  }, [repeatedTaskId]);

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
    try {
      setSubmitLoading(true);
      await createOrUpdateRepeatedTask({
        id: repeatedTaskId,
        uid: uid,
        content: repeatedTaskForm.content.value,
        createdAt: repeatedTaskCreatedDate,
        createdAtFormatted: format(
          repeatedTaskCreatedDate,
          repeatedTaskDateFormat
        ),
        schedule: repeatedTaskForm.schedule,
        scheduleDays: repeatedTaskForm.scheduleDays
      });
      setRepeatedTaskForm({
        id: "",
        content: {
          value: "",
          valid: true,
          validationMessage: ""
        },
        schedule: RepeatedTaskType.EveryDay,
        scheduleDays: [1, 2, 3, 4, 5, 6, 7]
      });
      refreshDataList();
      setSubmitLoading(false);
      selectRepeatedTaskIdForEdit("");
      setRepeatedTaskCreatedDate(new Date());
      toggleModal(undefined, true);
    } catch (error) {
      console.log(error);
      setSubmitLoading(false);
    }
  };

  return (
    <div className="repeated-tasks-edit-wrapper">
      <div className="repeated-task-edit-illustration-wrapper">
        <RepeatedTaskEditIllustration height="500px" width="500px" />
      </div>
      <div className="repeated-task-edit-form-wrapper">
        <CloseIcon height="24px" width="24px" onClickFunction={() => toggleModal(undefined, true)}/>
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
            rows={3}
          />
          <RepeatedTaskSchedule
            selectedTaskSchedule={repeatedTaskForm.schedule}
            handleScheduleChange={handleScheduleChange}
            selectedScheduleDays={repeatedTaskForm.scheduleDays}
            handleCustomScheduleDaysChange={handleCustomScheduleDaysChange}
          />
          <div className="repeated-task-edit-button-container">
            <Button
              type="button"
              text="Save"
              onSubmit={createRepeatedTask}
              loading={submitLoading}
              disabled={submitLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RepeatedTaskEdit;
