const { use } = require("./router");

const Client = require("mongodb").MongoClient;
const url =
  process.env.MONGODB_URI ||
  "mongodb+srv://tayinde:hnn322om@cluster0-nqwsw.mongodb.net/test?retryWrites=true&w=majority";

var account = {
  create: async (user, pwd) => {
    var db = await Client.connect(url);
    var dbo = await db.db("iboki");
    var entry = {
      username: user,
      password: pwd,
      pfpURL:
        "https://uwosh.edu/deanofstudents/wp-content/uploads/sites/156/2019/02/profile-default.jpg",
    };
    var exists = await dbo.collection("iboki_accounts").findOne(entry);
    if (exists == null) {
      await dbo.collection("iboki_accounts").insertOne(entry);
      console.log("Account created");
      await dbo.createCollection(user);
    } else {
      console.log("Account already exists");
      return 0;
    }
  },
  login: async (user, pwd) => {
    var db = await Client.connect(url);
    var dbo = await db.db("iboki");
    var entry = { username: user, password: pwd };
    var exists = await dbo.collection("iboki_accounts").findOne(entry);
    if (exists !== null) {
      console.log(`Signed in as ${user}`);
      return { isAuthenticated: true, user: exists };
    } else {
      console.log("Invalid login attempt");
      return { isAuthenticated: false, user: null };
    }
  },
  changepfp: async (user, pfpURL) => {
    var db = await Client.connect(url);
    var dbo = await db.db("iboki");
    await dbo
      .collection(logins)
      .updateOne(
        { username: user.username, password: user.password },
        { $set: { pfpurl: pfpURL } }
      );
  },
};

module.exports = account;
