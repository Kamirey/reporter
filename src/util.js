export const get = (url) => {
	return fetch(process.env.TRACKER_URL + url)
		.then(response => {
			return response.json();
		});
};