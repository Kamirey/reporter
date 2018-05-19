export const get = (url) => {
	return fetch(process.env.TRACKER_URL + url)
		.then(response => {
			return response.json();
		});
};

export const post = (url, body) => {
	return fetch(process.env.TRACKER_URL + url, {
		method: "POST",
		credentials: "same-origin",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	});
};