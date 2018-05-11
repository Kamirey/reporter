import Vue from "vue";
import App from "./App.vue";
import store from "./store.js";

const getPersons = () => {
	return fetch(process.env.TRACKER_URL + "persons/")
		.then(response => {
			return response.json();
		});
};

new Vue({
	el: "#app",
	render: h => h(App),
	store,
	created(){
		getPersons()
			.then(json => {
				this.$store.commit("setPersons", json.results);
			});
	}
});