const con = require("../config/database.js");

class File {
	/**
	 * @param {fileData} fileData
	 */
	constructor(fileData = {}) {
		this.fileID = fileData.fileID;
		this.filename = fileData.filename;
		this.title = fileData.title;
		this.created = fileData.created;
		this.hash = fileData.hash;
		this.userId = fileData.userId;
	}
	/**
	 * @param {String} collumn
	 * @param {String} value
	 * @returns {Promise<File>}
	 */
	static getFile(collumn, value) {
		return new Promise((resolve, reject) => {
			const sql = `SELECT * FROM file WHERE ${collumn} = ?`;
			con.execute(sql, [value], function (err, results, fields) {
				if (err) throw err;
				if (results.length == 0) reject(`No file found with ${collumn} = ${value}`);
				resolve(new File(results[0]));
			});
		});
	}

	static getById(id) {
		return this.getFile("fileID", id);
	}

	static getByName(filename) {
		return this.getFile("filename", filename);
	}
}

module.exports = File;

/**@typedef {Object} 
 * @property {Number} fileID
 * @property {String} filename
 * @property {String} title
 * @property {Timestamp} created
 * @property {string} hash
 * @property {Number} userId
 */