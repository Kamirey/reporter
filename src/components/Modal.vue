<template>
	<div class="wrapper">
		<div class="modal">
			<div class="modal-header"> 
				<label>{{header}}</label>
			</div>
			<div class="modal-body">
				<label>{{text}}</label>
			</div>
			<div class="modal-footer">
				<button @click="onClickPrimary">{{primaryButton}}</button>
				<button @click="onClickSecondary" v-if="secondaryButton !== ''">{{secondaryButton}}</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["header", "text", "primaryButton", "secondaryButton"],
	methods: {
		onClickPrimary() {
			this.$emit("primaryClicked");
		},
		onClickSecondary() {
			this.$emit("secondaryClicked");
		}
	}
}
</script>

<style lang="less" scoped>
	@import "../styles/definitions.less";
	@import "../styles/general.less";

	.modal {
		border: @border;
		position: fixed;
		background-color: white;
		float: left;
		left: 50%;
		top: 50%;
		width: 400px;
		height: 150px;
		margin-top: -75px;
		margin-left: -200px;
	}

	.modal-header {
		height: 20px;
		font-weight: bold;
		font-size: 16px;
		padding: 6px;
		background-color: #5fa5ef;
	}

	.modal-body {
		padding: 6px;
	}

	.modal-footer {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 6px;
	}

	button {
		width: 112px;
	}
</style>