const con = require("../database");

class User {
	/**
	 * @param {UserData} userData
	 */
	constructor(userData = {}) {
		this.userID = userData.userID;
		this.username = userData.username;
		this.password = userData.password;
		this.apiKey = userData.apiKey;
		this.isAdmin = userData.isAdmin;
		this.lastLogin = userData.lastLogin;
	}
	/**
	 * @param {String} collumn
	 * @param {String} value
	 * @returns {Promise<User>}
	 */
	static getUser(collumn, value) {
		return new Promise((resolve, reject) => {
			const sql = `SELECT * FROM user WHERE ${collumn} = ?`;
			con.execute(sql, [value], function(err, results, fields) {
				if (err) throw err;
				if (results.lenght == 0) reject(`No users found with ${collumn} = ${id}`);
				resolve(new User(results[0]));
			});
		});
	}

	static getById(id) {
		return this.getUser("userID", id);
	}

	static getByIdSync(id) {
		return this.getUser("userID", id);
	}

	static getByUsername(username) {
		this.getUser("username", username).then((user => {return user}));
	}

	static async getByApiKey(key) {
		return this.getUser("apiKey", key);
	}
}

module.exports = User;

/**@typedef {Object} UserData
 * @property {Number} userID
 * @property {String} username
 * @property {String} password
 * @property {String} apiKey
 * @property {Boolean} isAdmin
 * @property {Date} lastLogin
 */
