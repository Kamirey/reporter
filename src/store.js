import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {get} from "./util.js";

export default new Vuex.Store({
	state: {
		persons: [],
		height: 0,
		weightRecords: []
	},
	actions: {
		loadUserData({commit}, userId) {
			get("persons/" + userId)
				.then(data => {
					commit("setWeightRecords", data.weightRecords);
					commit("setHeight", data.heightInCm);
				});
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