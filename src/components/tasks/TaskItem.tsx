import React, {
  FC,
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react";
import "./TaskItem.css";
import TaskHeading from "./TaskHeading";
import Task from "./Task";
import AddIcon from "../icons/AddIcon";
import { Task as TaskType, TaskItemEdit } from "../../types/types";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
} from "react-beautiful-dnd";
import { isSameDay } from "date-fns";

interface TaskItemProps {
  date: Date;
  isCreateNew: boolean;
  setCreateNew: () => void;
  saveTask: (event?: KeyboardEvent<HTMLInputElement>) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  newTaskContent: string;
  onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
  tasks: TaskType[];
  setTaskItemMenuId: Dispatch<SetStateAction<string | null>>;
  taskItemMenuId: string | null;
  setTaskItemEdit: Dispatch<SetStateAction<TaskItemEdit>>;
  taskItemEdit: TaskItemEdit;
  deleteTask: () => Promise<void>;
  markTaskAsCompleted: (date: Date) => Promise<void>;
  onDragEnd: (result: any, date: Date) => Promise<void>;
  repeatedTaskIdSync: string;
  syncRepeatedTask: (taskId: string, date: Date) => Promise<void>;
}

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  marginBottom: "7px",
  ...draggableStyle,
});

const TaskItem: FC<TaskItemProps> = ({
  date,
  isCreateNew,
  setCreateNew,
  onInputChange,
  newTaskContent,
  onKeyPress,
  tasks,
  saveTask,
  setTaskItemMenuId,
  taskItemMenuId,
  setTaskItemEdit,
  deleteTask,
  taskItemEdit,
  markTaskAsCompleted,
  onDragEnd,
  repeatedTaskIdSync,
  syncRepeatedTask,
}) => {
  return (
    <div
      className={`task-item ${
        isSameDay(date, new Date()) ? " task-item--active" : ""
      }`}
    >
      <TaskHeading date={date} />
      <AddIcon height="18px" width="18px" onClickFunction={setCreateNew} />
      <div className="task-item-container">
        {isCreateNew && (
          <Task
            isCreateNew={isCreateNew}
            isEdit={isCreateNew}
            onInputChange={onInputChange}
            newTaskContent={newTaskContent}
            taskContent={newTaskContent}
            onKeyPress={onKeyPress}
            saveTask={saveTask}
            setTaskItemMenuId={setTaskItemMenuId}
            taskItemMenuId={taskItemMenuId}
            taskId=""
            setTaskItemEdit={setTaskItemEdit}
            deleteTask={deleteTask}
            isCompleted={false}
            markTaskAsCompleted={markTaskAsCompleted}
            isRepeated={false}
            date={date}
            isActive={true}
            isSyncing={false}
            syncRepeatedTask={syncRepeatedTask}
          />
        )}
        <DragDropContext
          onDragEnd={(result: DropResult) => onDragEnd(result, date)}
        >
          <Droppable droppableId="droppable">
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot
            ) => (
              <div
                className="task-item-container__inner"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task: TaskType, index: number) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id}
                    index={index}
                    isDragDisabled={
                      task.isRepeated && task.id.indexOf("repeated") > -1
                    }
                  >
                    {(
                      provided: DraggableProvided,
                      snapshot: DraggableStateSnapshot
                    ) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Task
                          isEdit={taskItemEdit.taskId === task.id}
                          onInputChange={onInputChange}
                          newTaskContent={newTaskContent}
                          taskContent={task.content}
                          onKeyPress={onKeyPress}
                          saveTask={saveTask}
                          key={task.id}
                          setTaskItemMenuId={setTaskItemMenuId}
                          taskItemMenuId={taskItemMenuId}
                          taskId={task.id}
                          setTaskItemEdit={setTaskItemEdit}
                          deleteTask={deleteTask}
                          isCompleted={task.isCompleted}
                          markTaskAsCompleted={markTaskAsCompleted}
                          isRepeated={task.isRepeated}
                          date={date}
                          isActive={task.isActive}
                          isSyncing={repeatedTaskIdSync === task.id}
                          syncRepeatedTask={syncRepeatedTask}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TaskItem;
