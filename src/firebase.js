import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDdekm-yyS9q0sv3ui3TIFZyaFVX1gRO74",
    authDomain: "bt3103-week-6-9f9c3.firebaseapp.com",
    projectId: "bt3103-week-6-9f9c3",
    storageBucket: "bt3103-week-6-9f9c3.appspot.com",
    messagingSenderId: "877200151207",
    appId: "1:877200151207:web:b9bf8361f55e3bd2504182",
    measurementId: "G-DRBHQBQQ9C"
  };
 

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;