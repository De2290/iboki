const Client = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI || 'mongodb+srv://tayinde:hnn322om@cluster0-nqwsw.mongodb.net/test?retryWrites=true&w=majority';

var account = {
	create: async (user, pwd) => {
		var db = await Client.connect(url);
		var dbo = await db.db("iboki");
		var entry = {username: user};
		var exists = await dbo.collection("iboki_accounts").findOne(entry);
		if (exists == null) {
			console.log('Account created');
		} else {
			console.log('Account already exists');
			return 0;
		}

	},
	login: (user, pwd) => {
		Client.connect(url, async (err, db) => {
			if (err) throw err;
			dbo = db.db("iboki");
			entry = {username: user, password: pwd};
			exists = await dbo.collection("iboki_accounts").findOne(entry);
			if (exists !== null) {
				console.log(`Signed in as ${user}`);
				return {isAuthenticated: true, user: exists}
			} else {
				console.log('Invalid login attempt');
				return {isAuthenticated: false, user: null}
			}
		})
	}
}

module.exports = account;