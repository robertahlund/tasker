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

export const deleteRepeatedTask = async (): Promise<void> => {};

export const getRepeatedTaskById = async (): Promise<void> => {};

export const getAllRepeatedTasksByUserId = async (): Promise<void> => {};
