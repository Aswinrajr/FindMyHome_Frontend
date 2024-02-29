import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA5H01I2IPY6n-eIkbIhnEoeWZV9JNM66w",
  authDomain: "findmyhome-f91ea.firebaseapp.com",
  projectId: "findmyhome-f91ea",
  storageBucket: "findmyhome-f91ea.appspot.com",
  messagingSenderId: "986137206549",
  appId: "1:986137206549:web:dcc45a867e4902399fd31c",
  measurementId: "G-R357EMYG48",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default analytics;
