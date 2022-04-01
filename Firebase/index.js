const firebaseAdmin = require("./admin/index");
const firebaseUser = require("./user/index");

const Module = {
  type: "",
  firebase: "",

  initialize: (type) => {
    console.log(firebase);
    switch (type) {
      case "admin":
        this.type = type;
        adminInitializeApp({
          credential: firebaseAdmin.credential.cert(firebaseAccount.admin),
          databaseURL:
            "https://what-for-lunch-eed47-default-rtdb.firebaseio.com/",
        });
        // this.firebase = firebaseAdmin;
        break;
      default:
        throw Error('Please specify TYPE; either "normal" or "admin".');
    }
    return {
      async setData(ref, data) {
        firebaseAdmin.database().ref(ref).set(data);
      },
      async getData(ref) {
        const test = await firebaseAdmin
          .database()
          .ref(ref)
          .on("value", this.dataHandling);
      },
      dataHandling(data) {
        this.testValue = data.val();
        console.log("data", data.val());
        return data.val();
      },
    };
  },
};

module.exports = Module;
