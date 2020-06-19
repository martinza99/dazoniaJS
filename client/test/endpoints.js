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
	upload: {
		inputs: [{ name: "file", type: "file", multiple: true }],
		url: "/api/upload/",
		options: {
			method: "POST",
			headers: {},
			body: true,
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
