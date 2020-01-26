import { RepeatedTask } from "../types/types";
import firebase from "../config/firebaseConfig";
import { repeatedTasksPath } from "../constants/constants";
import generateGuid from "uuid/v4";

const db = firebase.firestore();

export const createOrUpdateRepeatedTask = async (
  repeatedTask: RepeatedTask
): Promise<RepeatedTask> => {
  try {
    if (!repeatedTask.id) {
      repeatedTask.id = generateGuid();
      await db
        .collection(repeatedTasksPath)
        .doc(repeatedTask.id)
        .set(repeatedTask);
      return Promise.resolve(repeatedTask);
    } else {
      await db
        .collection(repeatedTasksPath)
        .doc(repeatedTask.id)
        .update(repeatedTask);
      return Promise.resolve(repeatedTask);
    }
  } catch (error) {
    return Promise.reject("Error created repeated task.");
  }
};

export const deleteRepeatedTask = async (
  repeatedTaskId: string
): Promise<void> => {
  try {
    await db
      .collection(repeatedTasksPath)
      .doc(repeatedTaskId)
      .delete();
    return Promise.resolve();
  } catch (error) {
    return Promise.reject("Error deleting repeated task.");
  }
};

export const getRepeatedTaskById = async (
  repeatedTaskId: string
): Promise<RepeatedTask> => {
  try {
    const repeatedTask: RepeatedTask = await db
      .collection(repeatedTasksPath)
      .doc(repeatedTaskId)
      .get()
      .then(document => {
        if (document.exists) {
          return document.data() as RepeatedTask;
        } else {
          return Promise.reject("No repeated task with that id exists.");
        }
      });
    return Promise.resolve(repeatedTask);
  } catch (error) {
    return Promise.reject("Error getting repeated task by id.");
  }
};

export const getAllRepeatedTasksByUserId = async (
  userId: string
): Promise<RepeatedTask[]> => {
  try {
    const repeatedTasks: RepeatedTask[] = [];
    await db
      .collection(repeatedTasksPath)
      .where("uid", "==", userId)
      .orderBy("createdAt", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(document => {
          repeatedTasks.push(document.data() as RepeatedTask);
        });
      });
    return Promise.resolve(repeatedTasks);
  } catch (error) {
    console.log(error);
    return Promise.reject("Error fetching repeated tasks.");
  }
};
