<template>
	<div>
		<div style="width: 200px;float:left;border-right: 1px solid black;">
			<post-list></post-list>
		</div>

		<div style="width:700px;float:left;">
			<h1>{{ msg }}</h1>
			<el-form label-width="80px" :model="formLabelAlign">
				<el-form-item label="标题">
					<el-input v-model="formLabelAlign.title"></el-input>
				</el-form-item>
				<el-form-item label="标签" style="width:200px;">
					<el-select v-model="formLabelAlign.tag" placeholder="请选择标签">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" style="width:100%;"></el-option>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="时间">
					<el-col :span="11">
						<el-date-picker v-model="formLabelAlign.time" type="date" placeholder="选择日期" style="width:100%;"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="内容">
					<el-input type="textarea" v-model="formLabelAlign.content"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm()">发布</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import PostList from '../common/postList.vue';

export default {
	name: "addPost",
	components: {
		PostList
	},
	data() {
		return {
			msg: "添加文章",
			formLabelAlign: {
				title: "",
				tag: "",
				time: "",
				content: ""
			},
			value1: "",
			value2: "",
			options: [{
					value: "技术",
					label: "技术"
				},
				{
					value: "生活",
					label: "生活"
				},
				{
					value: "测试",
					label: "测试"
				}
			]
		};
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
		submitForm: function() {
			var self = this;
			var url = self.serverUrl + "/api/addPost/";
			var postedTime = "";
			if (self.formLabelAlign.time) {
				// postedTime = self.$moment(self.formLabelAlign.time).format("YYYY-MM-DD");
				postedTime = Date.parse(new Date(self.formLabelAlign.time));
			} else {
				postedTime = "";
			}
			var data = {
				title: self.formLabelAlign.title,
				tag: self.formLabelAlign.tag,
				postedTime: postedTime,
				content: self.formLabelAlign.content
			};
			self.$http
				.post(url, $.param(data))
				.then(function(response) {
					if (response.data.code == "20000") {
						// self.$message({
						//   message: "发布成功！",
						//   type: "success"
						// });
						self.$alert("发布成功！", {
							confirmButtonText: "确定"
							// callback: action => {
							//   self.$message({
							//     type: "info",
							//     message: `action: ${action}`
							//   });
							// }
						});
						// self.getPostList();
					} else {
						// self.$message({
						//   message: response.data.message,
						//   type: "error"
						// });
						self.$alert(response.data.message, {
							confirmButtonText: "确定"
						});
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	}
};
</script>

<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		display: inline-block;
		margin: 0 10px;
	}
	a {
		color: #42b983;
	}
</style>
