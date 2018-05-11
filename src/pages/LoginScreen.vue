<template>
	<div id="login-screen">
		<div id="login-block">
			<div class="login-input-row">
				<label id="user-label" for="user-input">Username</label>
				<input class="input-field" id="user-input" type="text" v-model="searchText">
				</div>
			<br>
			<button id="login-button" type="button" @click="onClickLogin">Log in</button>
		</div>
		<modal v-if="showModal" header="Not Found" :text="userNotFoundText" primaryButton="Ok" secondaryButton="Cancel" @primaryClicked="showModal=false" @secondaryClicked="showModal=false"></modal>
	</div>
</template>

<script>
import modal from "../components/Modal.vue";

export default {
	components: {
		modal
	},
	data() {
		return {
			searchText: "",
			showModal: false,
			userNotFoundText: "User not found, please try again"
		};
	},
	methods: {
		onClickLogin() {
			const user = this.users.find(user => user.name === this.searchText);
			if (user !== undefined) {
				this.$store.dispatch("loadUserData", user.id);
			}
			else {
				this.showModal = true;
			}
		}
	},
	computed: {
		users: function() {
			return this.$store.state.persons.map(person => {return {id: person.id, name: person.name};});
		}
	}
}
</script>

<style lang="less" scoped>
	@import "../styles/general.less";

	#login-screen {
		background-color: #fcfcfc;
		position: fixed;
		width: 100%;
		height: 100%;
	}

	#login-block {
		position:fixed;
		top:50%;
		left:50%;
		width: 300px;
		height: 100px;
		margin-top: -50px;
		margin-left: -150px;
	}

	#user-input {
		width: auto;
	}

	#login-button {
		width: 200px;
		margin: auto;
	}
</style>