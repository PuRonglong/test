<template>
    <div>
        <div class="postContainer" v-for="post in postList" :key="post.title">
            <h3>{{post.title}}   <i class="el-icon-delete cursor" @click="deletePost(post)"></i></h3>
            <div>{{post.content}}</div>
        </div>
        <el-button type="primary" @click="getPostList()">获取</el-button>
        <!-- <img :src="imgb" /> -->
    </div>
</template>


<script>
import imga from '../../assets/images/logo.png';
export default {
    name: 'postList',
    data() {
        return {
            postList: [],
            imgb: imga
        };
    },
    mounted: function(){
        this.getPostList();
    },
    methods: {
    	getPostList(){
            var self = this;
    		var url = self.serverUrl + '/api/getAllPosts/';

		    self.postList = [];

    		self.$http.get(url)
			    .then(function (response) {
                    response.data.forEach(function (post) {
                        self.postList.push({
                            title: post.title,
                            content: post.content,
                            postId: post._id,
                            postedTime: post.postedTime
                        });
                    });
			    })
			    .catch(function (error) {
				    console.log('error');
			    });
        },
	    deletePost(post){
    		var self = this;
    		var url = self.serverUrl + '/api/deletePost/';
    		var data = {
    			postId: post.postId
            };
    		self.$http.post(url,data)
                .then(function (response) {
                    self.getPostList();
                })
			    .catch(function (error) {
				    console.log('error');
			    });
        }
    }
};
</script>

<style>
.postContainer{
    margin-bottom: 20px;
}
.cursor{
    cursor: pointer;
}
</style>
