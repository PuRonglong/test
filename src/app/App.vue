<template>
	<div>
		<div class="content_width">
			<!-- <el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="foo" name="first"></el-tab-pane>
				<el-tab-pane label="bar" name="second"></el-tab-pane>
				<el-tab-pane label="map" name="third"></el-tab-pane>
			</el-tabs> -->
			<router-view></router-view> 
		</div>
	</div>
</template>

<script>
export default {
	name: 'app',
	data() {
		return {
			activeName: 'second'
		};
	},
	methods: {
		handleClick(tab, event) {
			this.$router.push({ path: tab.label });
		}
	}
};
</script>

<style>
.content_width{
	width: 700px;
	margin: 0 auto;
}
</style>
