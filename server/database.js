const Client = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI || 'mongodb+srv://tayinde:hnn322om@cluster0-nqwsw.mongodb.net/test?retryWrites=true&w=majority';

var account = {
	create: (user, pwd) => {
		Client.connect(url, async (err, db) => {
			if (err) throw err;
			dbo = db.db("mydb");
			entry = {username: user};
			exists = await dbo.collection("iboki_accounts").findOne(entry);
			if (exists == null) {
				var exists = await dbo.collection("iboki_accounts").insertOne({username: user, password: pwd});
				console.log('Account created');
			} else {
				console.log('Account already exists');
			}
		})
	},
	login: (user, pwd) => {
		Client.connect(url, async (err, db) => {
			if (err) throw err;
			dbo = db.db('mydb');
			entry = {username: user, password: pwd};
			exists = await dbo.collection("iboki_accounts").findOne(entry);
			if (exists !== null) {
				console.log(`Signed in as ${user}`);
			} else {
				console.log('Invalid login attempt');
			}
		})
	}
}

module.exports = account;