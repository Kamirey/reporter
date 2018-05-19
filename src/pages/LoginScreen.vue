<template>
	<div id="login-screen">
		<div v-if="!showLogin" id="login-block">
			<button id="new-user-button" class="columnbutton" type="button" @click="onClickNewUser">New user</button>
			<button id="existing-user-button" class="columnbutton" type="button" @click="onClickExistingUser">Existing user</button>
		</div>
		<div v-else id="login-block">
			<div class="login-input-row">
				<label id="user-label" for="user-input">Username</label>
				<input class="input-field" id="user-input" type="text" v-model="searchText">
			</div>
			<br>
			<button id="login-button" class="rowbutton" type="button" @click="onClickLogin">Log in</button>
			<button id="cancel-button" class="rowbutton" type="button" @click="onClickCancel">Cancel</button>
		</div>
		<modal v-if="showModal" header="Not Found" :text="userNotFoundText" primaryButton="Ok" secondaryButton="" @primaryClicked="showModal=false" @secondaryClicked="showModal=false"></modal>
	</div>
</template>

<script>
import modal from "../components/Modal.vue";
import { router } from "../main.js";

export default {
	components: {
		modal
	},
	data() {
		return {
			showLogin: false,
			searchText: "",
			showModal: false,
			userNotFoundText: "User not known."
		};
	},
	methods: {
		onClickNewUser() {
			router.push("newuser");
		},
		onClickExistingUser() {
			this.showLogin = true;
		},
		onClickLogin() {
			const user = this.users.find(user => user.name === this.searchText);
			if (user !== undefined) {
				this.$store.dispatch("loadUserData", user.id);
			}
			else {
				this.showModal = true;
			}
		},
		onClickCancel() {
			this.showLogin = false;
		}
	},
	computed: {
		users: function() {
			return this.$store.state.persons;
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

	.rowbutton {
		width: 129px;
		margin: auto;
	}

	.columnbutton {
		width: 225px;
		margin-bottom: 6px;
	}
</style>