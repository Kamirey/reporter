import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";

Vue.use(Vuex);

new Vue({
	el: "#app",
	render: h => h(App)
});

const env = process.env;
console.log(env);

fetch(env.TRACKER_URL + "persons/")
	.then(response => {
		return response.json();
	})
	.then(json =>{
		console.log(json);
	});