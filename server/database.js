const { use } = require("./router");

const Client = require("mongodb").MongoClient;
const url =
  process.env.MONGODB_URI ||
  "mongodb+srv://tayinde:hnn322om@cluster0-nqwsw.mongodb.net/test?retryWrites=true&w=majority";


var check = {
	symbols : (user) => {
		var res;
		if ((user.search('<') !== -1) || (user.search('>') !== -1) || (user.search('&#36;') !== -1) || (user.search(' ') !== -1)) {
			res = true;
			console.log(user.search('&#36;') !== -1);
		} else {
			res = false;
		}
		return res;
	},
	inSize : (user) => {
		var res;
		if ((user.length < 16) && (user.length > 2)) {
			res = true;
		} else {
			res = false;
		}
		return res;
	}
}

var account = {
  create: async (user, pwd) => {
	console.log(user);
	var res;
    var db = await Client.connect(url);
    var dbo = await db.db("iboki");
    var entry = {username: user};
    var entry = {
      username: user,
      password: pwd,
      pfpURL:
        "https://uwosh.edu/deanofstudents/wp-content/uploads/sites/156/2019/02/profile-default.jpg",
    };
	var exists = await dbo.collection("iboki_accounts").findOne({username: user});
    if ((exists == null) && (check.symbols(user) == false) && (check.inSize(user) == true)) {
      await dbo.collection("iboki_accounts").insertOne(entry);
      console.log("Account created");
	  await dbo.createCollection(user);
	  res = {allowed: true, error: null};
	}
	// Tell user if their username is not permitted
	else if (check.symbols(user) == true) {
	  		res = {allowed: false, error: "No symbols or spaces allowed in username"};
	} else if (check.inSize(String(user)) == false) {
		res = {allowed: false, error: "Username must be 3-15 characters long."};
	}  else {
			res = {allowed: false, error: "Username already taken."};
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
	  res = { isAuthenticated: true, user: exists, error: null };
    } else {
	  res = { isAuthenticated: false, user: null, error: "Invalid login attempt" };
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
