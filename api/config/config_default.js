module.exports = {
	database: { host: "localhost", user: "admin", password: "12345678", database: "dazonia" },
	port: 1080,
	dazonia: {
		defaultTagName: "tag",
		picsPerPage: 100,
	},
	session:{
		cookieKey: ["secret"]
	}
}
