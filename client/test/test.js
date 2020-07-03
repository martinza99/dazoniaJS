const output = document.getElementById("output");
const fieldset = document.getElementsByTagName("fieldset")[0];

fetch("/api/files").then((res) =>
	res.json().then((files) => {
		const fileList = document.getElementById("files");
		for (const file of files) {
			const option = document.createElement("option");
			option.value = file.filename;
			fileList.appendChild(option);
		}
	})
);
fetch("/api/users").then((res) =>
	res.json().then((users) => {
		const userList = document.getElementById("users");
		for (const user of users) {
			const option = document.createElement("option");
			option.value = user.username;
			userList.appendChild(option);
		}
	})
);

let endpoint;

const form = document.forms[0];
form.addEventListener("submit", async (event) => {
	const options = Object.assign({}, endpoint.options);
	if (!options.headers)
		options.headers = { "Content-Type": "application/json" };
	let url = new URL(location.origin + endpoint.url);
	// url.searchParams.
	const formData = new FormData(form);
	if (endpoint.options.method == "GET")
		for (const [key, value] of formData.entries()) {
			url.searchParams.append(key, value);
		}

	if (formData.has("id"))
		url.href = url.href.replace(":id", formData.get("id"));
	formData.delete("id");

	if (options.body) {
		if (options.headers["Content-Type"] != "application/json")
			options.body = formData;
		else {
			const data = {};
			for (const [key, val] of formData.entries()) data[key] = val;
			options.body = JSON.stringify(data);
		}
	}
	const res = await fetch(url, options);
	// if (res.type != "error") {
	// 	console.log(await res.json());
	// }

	if (res.ok && res.status != 204) console.log(await res.json());
});

const select = document.getElementsByTagName("select")[0];
select.addEventListener("input", selectCB);

function selectCB(event) {
	fieldset.innerHTML = "";
	const value = select.selectedOptions[0].value;
	endpoint = endpoints[value];
	if (!endpoint.inputs) return;
	for (let input of endpoint.inputs) {
		if (typeof input == "string") {
			input = {
				name: input,
				type: "text",
			};
		}
		const element = document.createElement("input");
		element.placeholder = input.name;
		for (const [key, val] of Object.entries(input))
			element.setAttribute(key, val);

		fieldset.appendChild(element);
		fieldset.appendChild(document.createElement("br"));
	}
}

selectCB();
