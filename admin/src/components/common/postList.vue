<template>
	<ul class="post-list reset-list">
		<li class="post-list-item" v-for="post in postList" :key="post._id">
			<span style="width:174px;display:inline-block;" @click="getPostDetail(post)">{{post.title}}</span>
			<span style="float:right;padding-right:10px;" @click="deletePost(post)"><i class="el-icon-delete"></i></span>
		</li>
	</ul>
</template>

<style scoped>
.post-list-item{
	height: 50px;
	line-height: 50px;
	border-bottom: 1px solid #eee;
}
</style>

<script>
	export default {
		data() {
			return {
				currentId: '',
				postList: []
			};
		},	
		mounted: function() {
			this.getPostList();
		},
		methods: {
			getPostList() {
				var self = this;
				var url = self.serverUrl + "/api/getAllPosts";
				self.$http.get(url).then(function(response) {
					var array = response.data;
					for (var i = 0; i < array.length; i++) {
						array[i].postedTime = self.$moment(array[i].postedTime).format("YYYY-MM-DD");
					}
					self.postList = array;
				})
				.catch(function(error) {
					console.log(error);
				});
			},
			getPostDetail(post) {
				// this.emit('focus-article', index)
				// if (!this.postSaved || !this.postTitleSaved) {
				// 	alert('当前文章正在保存中,请稍后重试')
				// 	return
				// }
				// if (index !== this.currentPostIndex) {
				// 	this.focusOnPost(index)
				// }
				var self = this;
				var url = self.serverUrl + "/api/getPostDetail/";
				var data = {
					postId: post._id
				};
				debugger
				self.$http.get(url, {params:data}).then(function(response) {
					if(response.data.code == '20000'){
						var formData = response.data.data;
					}else{
						self.$message({
					  		message: response.data.message,
					  		type: "error"
						});
					}
				})
				.catch(function(error) {
					console.log(error);
				});
			},
			deletePost(post){
				var self = this;
				var url = self.serverUrl + '/api/deletePost';
				var data = {
					postId: post._id
				};
				self.$http.post(url, $.param(data)).then(function(response){
					if(response.data.code == '20000'){
						self.$message({
							message: response.data.message,
							type: "success"
						});
						self.getPostList();
					}else{
						self.$message({
					  		message: response.data.message,
					  		type: "error"
						});
					}
				})
				.catch(function(error) {
					console.log(error);
				});
			}
		}
	}
</script>
