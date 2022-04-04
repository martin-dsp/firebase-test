// user
const firebase = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const firebaseKey = require("../../firebaseAccountKey.json");
// admin
const firebaseAdmin = require("firebase-admin");
const { initializeApp: adminInitializeApp } = require("firebase-admin/app");

class FirebaseConfig {
  constructor(type) {}

  initializeApp() {
    throw Error("Have you finished set up for <initializeApp>?");
  }

  signIn() {
    throw Error("You cannot use this method for this class instance.");
  }

  setData(ref, data) {
    throw Error("Have you finished set up for <setData>?");
  }

  getData(ref) {
    throw Error("Have you finished set up for <getData>?");
  }

  doTransaction(ref) {
    throw Error("Have you finished set up for <doTransaction>?");
  }
}

class UserFirebase extends FirebaseConfig {
  constructor(type) {
    super(type);
    console.log(type);
  }

  async initializeApp() {
    console.log(this.config);
    const user = firebase.initializeApp(this.config);
    const auth = getAuth(user);
    await this.signIn(auth, "kcs19542001@gmail.com", "ckdtnfkds2");
    this.app = firebase;
  }

  async signIn(auth, email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      await createUserWithEmailAndPassword(auth, email, password);
    }
  }

  async getData(ref) {
    const result = await this.app
      .database()
      .ref(ref)
      .on("value", (val) => console.log(val.val()));
  }
}

class AdminFirebase extends FirebaseConfig {
  constructor(adminConfig) {
    this.config = adminConfig;
    this.app;
  }

  async initializeApp() {
    adminInitializeApp({
      credential: firebaseAdmin.credential.cert(config.admin),
      databaseURL: "https://what-for-lunch-eed47-default-rtdb.firebaseio.com/",
    });
    this.app = firebaseAdmin;
  }
}

module.exports = new UserFirebase();

// const Module = {
//   initialize: async () => {
//     const app = firebase.initializeApp(config.user);

//     const auth = getAuth(app);

//     try {
//       console.log("로그인가능!?");
//       const user = await signInWithEmailAndPassword(
//         auth,
//         "kcs19542001@gmail.com",
//         "ckdtnfkds2"
//       );
//       console.log(user.user.email);
//     } catch (error) {
//       console.log("로그인불가..");
//       await createUserWithEmailAndPassword(
//         auth,
//         "kcs19542001@gmail.com",
//         "ckdtnfkds2"
//       ).catch((err) => {
//         console.log("Create User Error", err);
//       });
//     }

//     return {
//       getData: (ref) => {
//         firebase
//           .database()
//           .ref(ref)
//           .on("value", (val) => {
//             console.log(val.val());
//           });
//       },
//     };
//   },
//   async adminInitialize() {
//     const app = adminInitializeApp(config.admin);
//   },
// };

// // Module.initialize().getData("test1/test2");

// module.exports = Module;
