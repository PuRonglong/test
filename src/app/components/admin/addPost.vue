<template>
    <div>
        <div>
            <el-form ref="form" :model="post" label-width="80px">
                <el-form-item label="标题：">
                    <el-input v-model="post.title"></el-input>
                </el-form-item>
                <el-form-item label="内容：">
                    <el-input type="textarea" v-model="post.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitPost('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import qs from 'qs';

export default {
    name: 'addPost',
    data() {
        return {
            post: {}
        };
    },
    methods: {
        submitPost: function () {
            var self = this;
            var url = self.serverUrl + '/api/addPost/';
            var data = {
	            title: self.post.title,
	            content: self.post.content,
            };
            self.$http.post(url, data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
};
</script>

<style>

</style>
