import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyCTdVSnY07yeVXe0SFYiaUu6nf_VZWz2dQ",
    authDomain: "tasker-8d425.firebaseapp.com",
    databaseURL: "https://tasker-8d425.firebaseio.com",
    projectId: "tasker-8d425",
    storageBucket: "tasker-8d425.appspot.com",
    messagingSenderId: "637341026225",
    appId: "1:637341026225:web:6a1df9c8eccda2d01f5f90",
    measurementId: "G-VQ8HRCWZS6"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();