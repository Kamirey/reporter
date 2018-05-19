<template>
	<div id="new-user">
		<label id="user-label" for="user-input">Username</label>
		<input class="input-field" id="user-input" type="text" v-model="username">
		<br>
		<label id="height-label" for="height-input" min="0">Height</label>
		<input class="input-field" id="height-input" type="number" v-model="height">
		<br>
		<label id="start-weight-label" for="start-weight-input" min="0">Start weight</label>
		<input class="input-field" id="start-weight-input" type="number" v-model="startWeight">
		<label id="start-date-label" for="start-date-input">Start date</label>
		<input class="input-field" id="start-date-input" type="date" v-model="startDate">
		<br>
		<label id="goal-weight-label" for="goal-weight-input" min="0">Goal weight</label>
		<input class="input-field" id="goal-weight-input" type="number" v-model="goalWeight">
		<label id="goal-date-label" for="goal-date-input">Goal date</label>
		<input class="input-field" id="goal-date-input" type="date" v-model="goalDate">

		<br>
		<div class="button-bar">
			<button id="create-button" class="rowbutton" type="button" @click="onClickCreate">Create</button>
			<button id="cancel-button" class="rowbutton" type="button" @click="onClickCancel">Cancel</button>
		</div>
	</div>
</template>

<script>
import { router } from "../main.js";

export default {
	data() {
		return {
			username: "",
			height: 0,
			startWeight: 0,
			startDate: new Date().toISOString().substring(0, 10),
			goalWeight: 0,
			goalDate: new Date().toISOString().substring(0, 10)
		};
	},
	methods: {
		onClickCancel() {
			router.push("login");
		},
		onClickCreate() {
			const data = {
				person: {
					name: this.username,
					height: this.height
				},
				weightRecord: {
					timeStamp: new Date(this.startDate).getTime(),
					weight: this.startWeight
				}
			};
			this.$store.dispatch("createUser", data);
		}
	}
}
</script>

<style lang="less">
	@import "../styles/general.less";

	#new-user {
		position:fixed;
		top:50%;
		left:50%;
		width: 550px;
		height: 100px;
		margin-top: -50px;
		margin-left: -275px;
	}

	label {
		padding-left: 6px;
	}

	input[type=number]::-webkit-inner-spin-button, 
	input[type=number]::-webkit-outer-spin-button { 
		-webkit-appearance: none;
		-moz-appearance: none;
		display: none;
		margin: 0; 
	}

	input[type=date]::-webkit-inner-spin-button {
		-webkit-appearance: none;
		display: none;
	}

	button {
		width: 129px;
		margin: 6px;
	}

	.button-bar {
		margin: auto;
		padding-top: 12px;
		width: 52%;
	}
</style>