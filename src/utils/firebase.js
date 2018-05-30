import firebase from "firebase";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";

const config = {
  apiKey: process.env.GATSBY_API_KEY,
  authDomain: process.env.GATSBY_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_DATABASE_URL,
  projectId: process.env.GATSBY_PROJECT_ID,
  storageBucket: process.env.GATSBY_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.storage = firebase.storage;
    this.database = firebase.database;
    this.auth = firebase.auth;
  }
}

export default new Firebase();
