const { use } = require("./router");

const Client = require("mongodb").MongoClient;
const url =
  process.env.MONGODB_URI ||
  "mongodb+srv://tayinde:hnn322om@cluster0-nqwsw.mongodb.net/test?retryWrites=true&w=majority";
var account = {
  create: async (user, pwd) => {
	var res;
    var db = await Client.connect(url);
    var dbo = await db.db("iboki");
    var entry = {username: user};
    var exists = await dbo.collection("iboki_accounts").findOne(entry);
    if (exists == null) {
      await dbo.collection("iboki_accounts").insertOne({username: user, password: password});
      console.log("Account created");
	  await dbo.createCollection(user);
	  res = true;
    } else {
      console.log("Account already exists");
      res = "Account already exists";
	}
	return res;
  },
  login: async (user, pwd) => {
	var res;
    var db = await Client.connect(url);
    var dbo = await db.db("iboki");
    var entry = { username: user, password: pwd };
    var exists = await dbo.collection("iboki_accounts").findOne(entry);
    if (exists !== null) {
      console.log(`Signed in as ${user}`);
	  res = { isAuthenticated: true, user: exists };
    } else {
      console.log("Invalid login attempt");
	  res = { isAuthenticated: false, user: null };
	}
	return res;
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
