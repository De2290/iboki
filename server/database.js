const { use } = require("./router");

const Client = require("mongodb").MongoClient;
const url =
  process.env.MONGODB_URI ||
  "mongodb+srv://tayinde:hnn322om@cluster0-nqwsw.mongodb.net/test?retryWrites=true&w=majority";

const unallowed = [
	'!' ,
	'%',
	'@' ,
	"#" ,
	"&" ,
	"=" ,
	"<" ,
	">" ,
	":" ,
	";" ,
	"," ,
	"/" , 
	"~" ,
	"`" ,
	"," ,
	"]" ,
	RegExp('\\\\'),
	"{" ,
	"}" ,
]
var check = {
	symbols : (user) => {
		user = user
		.replace(/\+/g &&
			/\*/g &&
			/\$/g &&
			/\^/g &&
			/%/g &&
			/\)/g &&
			/\(/g &&
			/\\/g &&
			/\?/g &&
			/\[/g &&
			/|/g &&
			/./g &&
			/\d@\d/g &&
			RegExp('/\\\/')
		, '_')
		var res;
		var num = 0;
		unallowed.forEach((symbol) => {
			if (user.search(symbol) !== -1) {
				num += 1;
				console.log(symbol);
			}
		})
		if (num > 0) {
			res = true;
			console.log(num);
		} else {
			res = false;
			console.log("No symbols detected");
		}
		return res;
	},
	inSize : (user) => {
		var res;
		if ((user.length < 26) && (user.length > 2)) {
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
		res = {allowed: false, error: "Username must be 3-25 characters long."};
	}  else {
			res = {allowed: false, error: "Username already taken."};
	}
	return res;
  },
  login: async (user, pwd, key) => {
	var res;
    var db = await Client.connect(url);
    var dbo = await db.db("iboki");
    var entry = { username: user, password: pwd };
    var exists = await dbo.collection("iboki_accounts").findOne(entry);
    if (exists !== null) {
      console.log(`Signed in as ${user}`);
	  res = { isAuthenticated: true, user: exists, error: null, key: key };
    } else {
	  res = { isAuthenticated: false, user: null, error: "Invalid login attempt", key: null };
	}
	return res;
  },
  changepfp: async (user, pfpURL) => {
    var db = await Client.connect(url);
    var dbo = await db.db("iboki");
    await dbo
      .collection('iboki_accounts')
      .updateOne(
        { username: user.username, password: user.password },
        { $set: { pfpurl: pfpURL } }
      );
  },
};

module.exports = account;