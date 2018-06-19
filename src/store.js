import Vue from "vue";
import Vuex from "vuex";

import { get, post } from "./util.js";
import { router } from "./main.js";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		persons: [],
		userName: "",
		height: 0,
		weightRecords: []
	},
	getters: {
		getTableData(state) {
			return state.weightRecords;
		}
	},
	actions: {
		loadUserData({commit}, userId) {
			get("/persons/" + userId)
				.then(data => {
					commit("setLoggedInUser", {
						name: data.name,
						height: data.height,
						weightRecords: data.weightRecords
					});
				});
		},
		createUser({commit}, data) {
			post("/persons/", data.person)
				.then(
					response => response.json()
				)
				.then(
					body => post("/weightRecords/" + body.id, data.weightRecord)
				);
			commit("setLoggedInUser", {
				name: data.person.name,
				height: data.person.height,
				weightRecords: [data.weightRecord]
			});
		}
	},
	mutations: {
		setPersons(state, persons) {
			state.persons = persons;
		},
		setLoggedInUser(state, {name, height, weightRecords}) {
			state.userName = name;
			state.weightRecords = weightRecords.sort((a, b) => b.timeStamp - a.timeStamp);
			state.height = height;
			router.push("/history");
		}
	}
});