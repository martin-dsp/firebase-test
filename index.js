const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

const firebaseAdmin = require("firebase-admin");
const { initializeApp: adminInitializeApp } = require("firebase-admin/app");
require("firebase/auth");
require("firebase/database");
require("firebase/storage");

const serviceAccount = require("./serviceAccountKey.json");

console.time("adminInitialize");
// Initialize the Admin app by providing a service account key
adminInitializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: process.env.databaseURL,
});
console.timeEnd("adminInitialize");

const firebaseSetting = async () => {
  const uid = "whatforlunch";

  let customToken;

  try {
    customToken = await firebaseAdmin.auth().createCustomToken(uid);
  } catch (error) {
    console.log(error);
    return;
  }

  return { customToken };
};

const signIn = async (token) => {
  let ret;

  try {
    const authy = await getAuth(firebase);

    ret = await signInWithCustomToken(authy, token);
  } catch (error) {
    return;
  }

  return ret.user;
};

const getData = async () => {
  const response = await firebaseAdmin
    .database()
    .ref("test/test")
    .on("value", (snapshot) => {
      console.log(snapshot.val());
    });

  return response;
};

const pushData = async () => {
  const response = await firebaseAdmin
    .database()
    .ref("test/test")
    .set({ test1: "test1" });

  return response;
};

// createCustomToken
app.get("/getToken", async (req, res) => {
  const ret = await firebaseSetting();

  res.json(ret);
});

// signInWithCustomToken
app.get("/login", async (req, res) => {
  const ret = await signIn("token");

  res.json(ret);
});

app.get("/push", async (req, res) => {
  console.time("pushData");
  await pushData();
  console.timeEnd("pushData");

  res.send("successful");
});

app.get("/data", async (req, res) => {
  console.time("getData");
  const ret = await getData();
  console.timeEnd("getData");

  res.json(ret);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is on ${port}!`);
});
