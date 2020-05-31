const database = { host: "localhost", user: "admin", password: "12345678", database: "dazonia" };
const port = 1080;
const sessionSecret = "secret";
const dazonia = {
	defaultTagName: "tag",
	picsPerPage: 100,
};

module.exports = { database, port, dazonia, sessionSecret };
