const endpoints = {
	list: {
		inputs: [],
		url: "/api/list",
		options: {
			method: "GET",
		},
	},
	files: {
		inputs: ["id"],
		url: "/api/files/:id",
		options: {
			method: "GET",
		},
	},
	filesDelete: {
		inputs: ["id"],
		url: "/api/files/:id",
		options: {
			method: "DELETE",
		},
	},
	filesTitle: {
		inputs: ["id", "title"],
		url: "/api/files/:id/title",
		options: {
			method: "PATCH",
			body: true,
		},
	},
	filesUpload: {
		inputs: [{ name: "file", type: "file", multiple: true }],
		url: "/api/files/",
		options: {
			method: "POST",
			headers: {},
			body: true,
		},
	},
	ratings: {
		inputs: ["id"],
		url: "/api/files/:id/ratings",
		options: {
			method: "GET",
		},
	},
	ratingsPut: {
		inputs: ["id", { name: "rating", type: "number" }],
		url: "/api/files/:id/ratings",
		options: {
			method: "PUT",
			body: true,
		},
	},
	ratingsDelete: {
		inputs: ["id"],
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
		inputs: ["id"],
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
