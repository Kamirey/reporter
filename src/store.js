import Vue from "vue";
import Vuex from "vuex";

import { get, post } from "./util.js";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		persons: [],
		height: 0,
		weightRecords: []
	},
	actions: {
		loadUserData({commit}, userId) {
			get("/persons/" + userId)
				.then(data => {
					commit("setWeightRecords", data.weightRecords);
					commit("setHeight", data.height);
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
			commit("setWeightRecords", [data.weightRecord]);
			commit("setHeight", data.height);
		}
	},
	mutations: {
		setPersons(state, persons) {
			state.persons = persons;
		},
		setWeightRecords(state, weightRecords) {
			state.weightRecords = weightRecords;
		},
		setHeight(state, height) {
			state.height = height;
		}
	}
});