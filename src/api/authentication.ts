import firebase from "../config/firebaseConfig";
import {Auth} from "../types/types";

export const login = async (email: string, password: string): Promise<void> => {
  await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const logout = async (): Promise<void> => {
  await firebase.auth().signOut();
};

export const register = async (email: string, password: string): Promise<void> => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const onAuthChangeHandler = (auth: firebase.User | null): Auth => {
  return {
    uid: auth?.uid ? auth.uid : "",
    authenticated: !!auth?.uid
  }
};