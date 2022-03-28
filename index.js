const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
require("firebase/storage");
const firebaseAdmin = require("firebase-admin");

const firebaseSetting = async () => {
  console.time("firebase init");
  firebaseAdmin.initializeApp();
  console.timeEnd("firebase init");

  try {
    const token = await firebaseAdmin
      .auth()
      .createCustomToken("martin@washswat.com");
    console.log("customToken", token);
  } catch (e) {
    console.log(e);
  }

  console.time("firebase ref");
  const database = firebase.database();
  await database.ref("tagging/test").set({ test1: "test1" });
  console.timeEnd("firebase ref");
};

app.get("/test", (req, res) => {
  firebaseSetting().then((result) => {
    res.send(result);
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is on ${port}!`);
});
