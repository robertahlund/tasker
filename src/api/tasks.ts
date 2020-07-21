import { Task } from "../types/types";
import firebase from "../config/firebaseConfig";
import { tasksPath } from "../constants/constants";
import generateGuid from "uuid/v4";

const db = firebase.firestore();

export const createOrUpdateTask = async (task: Task): Promise<Task> => {
  try {
    if (!task.id) {
      task.id = generateGuid();
      await db.collection(tasksPath).doc(task.id).set(task);
      return Promise.resolve(task);
    } else {
      await db.collection(tasksPath).doc(task.id).update(task);
      return Promise.resolve(task);
    }
  } catch (error) {
    return Promise.reject("Error creating/updating task.");
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await db.collection(tasksPath).doc(taskId).delete();
    return Promise.resolve();
  } catch (error) {
    return Promise.reject("Error deleting task.");
  }
};

export const getTaskById = async (taskId: string): Promise<Task> => {
  try {
    const task: Task = await db
      .collection(tasksPath)
      .doc(taskId)
      .get()
      .then((document) => {
        if (document.exists) {
          return {
            id: document.data()!.id,
            uid: document.data()!.uid,
            content: document.data()!.content,
            date: document.data()!.date,
            dateFormatted: document.data()!.dateFormatted,
            isRepeated: document.data()!.isRepeated,
          };
        } else {
          return Promise.reject("No task with that id exists.");
        }
      });
    return Promise.resolve(task);
  } catch (error) {
    return Promise.reject("Error getting task by id.");
  }
};

export const getAllRepeatedTasksByUserId = async (
  userId: string
): Promise<Task[]> => {
  try {
    const tasks: Task[] = [];
    await db
      .collection(tasksPath)
      .where("uid", "==", userId)
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          tasks.push(document.data() as Task);
        });
      });
    return Promise.resolve(tasks);
  } catch (error) {
    console.log(error);
    return Promise.reject("Error getting tasks.");
  }
};

export const getAllRepeatedTasksByDateRange = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<Task[]> => {
  try {
    const tasks: Task[] = [];
    await db
      .collection(tasksPath)
      .where("uid", "==", userId)
      .where("date", ">=", startDate)
      .where("date", "<=", endDate)
      .orderBy("date", "asc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          tasks.push(document.data() as Task);
        });
      });
    return Promise.resolve(tasks);
  } catch (error) {
    console.log(error);
    return Promise.reject("Error getting tasks.");
  }
};
