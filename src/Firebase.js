import firebase from "firebase/app";
import "firebase/firebase-database";

var CONFIG = {
  apiKey: "AIzaSyBTFaD4l0cLNBk7L5kq2vD6cu5dWMu1yaw",
  authDomain: "seba-bb122.firebaseapp.com",
  projectId: "seba-bb122",
  storageBucket: "seba-bb122.appspot.com",
  messagingSenderId: "566830460220",
  appId: "1:566830460220:web:7c3c7f15fddd13ca9f0239",
};

class Firebase {
  instance = null;
  db = null;

  constructor() {
    console.info("Initialization of firebase...");
  }

  init() {
    if (!this.instance) {
      this.instance = firebase.initializeApp(CONFIG);
      this.db = firebase.database();
    }
  }

  getDb() {
    return this.db;
  }
}

export default new Firebase();
