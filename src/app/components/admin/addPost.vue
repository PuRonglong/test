<template>
    <div>
        <div>
            <el-form ref="form" :model="post" label-width="80px">
                <el-form-item label="标题：">
                    <el-input v-model="post.title"></el-input>
                </el-form-item>
                <el-form-item label="内容：">
                    <!-- <el-input type="textarea" v-model="post.content"></el-input>  -->
                    <textarea id="editor" v-model="post.content"></textarea>
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
import SimpleMDE from 'simplemde';
import '../../../assets/css/simplemde.css';
import marked from 'marked';

export default {
    name: 'addPost',
    data() {
        return {
            post: {}
        };
    },
    mounted: function(){
        var self = this;
        var smde = new SimpleMDE({
            element: document.getElementById('editor'),
            autofocus: true,
            autosave: true,
            previewRender: function(plainText) {
                return marked(plainText,{
                    renderer: new marked.Renderer(),
                    gfm: true,
                    pedantic: false,
                    sanitize: false,
                    tables: true,
                    breaks: true,
                    smartLists: true,
                    smartypants: true,
                });
            },
        });
        smde.codemirror.on("change", function(){
            var value = smde.value();
            self.post.content = value
        });
    },
    methods: {
        submitPost: function () {
            var self = this;
            var url = self.serverUrl + '/api/addPost/';
            var data = {
	            title: self.post.title,
	            content: self.post.content,
            };

            if(!data.title){
                self.showMessage('标题为空，发布失败！', 'error');
                return;
            }
            if(data.title && data.title.trim().length == 0){
                self.showMessage('标题为空，发布失败！', 'error');
                return;
            }

            self.$http.post(url, data)
                .then(function (response) {
                    self.showMessage('发布成功！', 'success');
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        showMessage: function(message, type) {
            this.$message({
                showClose: true,
                message: message,
                type: type || 'info'
            });
        }
    }
};
</script>

<style>

</style>
