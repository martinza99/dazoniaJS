const endpoints = {
	filesClear: {
		url: "/api/files/clear",
		options: {
			method: "DELETE",
		},
	},
	filesList: {
		inputs: ["tags"],
		url: "/api/files",
		options: {
			method: "GET",
		},
	},
	files: {
		inputs: [{ name: "id", list: "files" }],
		url: "/api/files/:id",
		options: {
			method: "GET",
		},
	},
	filesDelete: {
		inputs: [{ name: "id", list: "files" }],
		url: "/api/files/:id",
		options: {
			method: "DELETE",
		},
	},
	filesTitle: {
		inputs: [{ name: "id", list: "files" }, "title"],
		url: "/api/files/:id/title",
		options: {
			method: "PATCH",
			body: true,
		},
	},
	filesUpload: {
		inputs: [{ name: "file", type: "file", multiple: true }],
		url: "/api/files",
		options: {
			method: "POST",
			headers: {},
			body: true,
		},
	},
	filesReplace: {
		inputs: [
			{ name: "id", list: "files" },
			{ name: "file", type: "file" },
		],
		url: "/api/files/:id",
		options: {
			method: "PATCH",
			headers: {},
			body: true,
		},
	},
	ratings: {
		inputs: [{ name: "id", list: "files" }],
		url: "/api/files/:id/ratings",
		options: {
			method: "GET",
		},
	},
	ratingsPut: {
		inputs: [
			{ name: "id", list: "files" },
			{ name: "rating", type: "number" },
		],
		url: "/api/files/:id/ratings",
		options: {
			method: "PUT",
			body: true,
		},
	},
	ratingsDelete: {
		inputs: [{ name: "id", list: "files" }],
		url: "/api/files/:id/ratings",
		options: {
			method: "DELETE",
		},
	},
	users: {
		url: "/api/users",
		options: {
			method: "GET",
		},
	},
	usersGet: {
		inputs: [{ name: "id", list: "users" }],
		url: "/api/users/:id",
		options: {
			method: "GET",
		},
	},
	usersMe: {
		url: "/api/users/@me",
		options: {
			method: "GET",
		},
	},
	authLogin: {
		inputs: ["username", { type: "password", name: "password" }],
		url: "/auth/login",
		options: {
			method: "POST",
			body: true,
		},
	},
	authLogout: {
		url: "/auth/logout",
		options: {
			method: "POST",
		},
	},
};
