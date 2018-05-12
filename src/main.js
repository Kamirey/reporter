import Vue from "vue";
import App from "./App.vue";
import store from "./store.js";
import VueRouter from "vue-router";
import LoginScreen from "./pages/LoginScreen.vue";
import NewUser from "./pages/NewUser.vue";

Vue.use(VueRouter);

const routes = [
	{ path: "/", redirect: "/login" },
	{ path: "/login", component: LoginScreen },
	{ path: "/newuser", component: NewUser }
];

export const router = new VueRouter({
	routes
});

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
	router,
	created(){
		getPersons()
			.then(json => {
				this.$store.commit("setPersons", json.results);
			});
	}
});