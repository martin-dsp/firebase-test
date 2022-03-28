require("dotenv").config();
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
require("firebase/storage");
const firebaseAdmin = require("firebase-admin");

const { getDatabase, ref, set } = require("firebase/database");

const test = async () => {
  if (!firebase.apps.length) {
    const result = firebase.initializeApp({
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      storageBucket: process.env.storageBucket,
    });
  } else {
    firebase.app(); // if already initialized, use that one
  }

  try {
    result = await firebase
      .auth()
      .signInWithEmailAndPassword("martin@washswat.com", "washswat1987");
  } catch (e) {
    result = await firebase
      .auth()
      .createUserWithEmailAndPassword("martin@washswat.com", "washswat1987");
  }

  let response = await firebase
    .database()
    .ref(`printer/622637758f7870431f26c57f`)
    .on("value", (val) => {
      console.log("val", val.val());
    });
};

test();
