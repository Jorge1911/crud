// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8S40XN8LQfZAYNBoxcFvVNHfbDTKHEZQ",
  authDomain: "proyecto-8520b.firebaseapp.com",
  projectId: "proyecto-8520b",
  storageBucket: "proyecto-8520b.appspot.com",
  messagingSenderId: "1020191639166",
  appId: "1:1020191639166:web:b25aaa4eb9cd07b17b3a2f",
  measurementId: "G-HTRJCTTJF5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);