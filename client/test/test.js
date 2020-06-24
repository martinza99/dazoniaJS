const output = document.getElementById("output");
const fieldset = document.getElementsByTagName("fieldset")[0];

let endpoint = endpoints.list;

const form = document.forms[0];
form.addEventListener("submit", async (event) => {
	const options = Object.assign({}, endpoint.options);
	if (!options.headers)
		options.headers = { "Content-Type": "application/json" };
	let url = endpoint.url;
	const formData = new FormData(form);

	if (formData.has("id")) url = url.replace(":id", formData.get("id"));
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
	if (res.type != "error") {
		console.log(await res.json());
	}

	// output.textContent += (await res.text()) + "\n";
});

const select = document.getElementsByTagName("select")[0];
select.addEventListener("input", (event) => {
	fieldset.innerHTML = "";
	const value = event.target.selectedOptions[0].value;
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
		for (const [key, val] of Object.entries(input)) element[key] = val;

		fieldset.appendChild(element);
		fieldset.appendChild(document.createElement("br"));
	}
});
