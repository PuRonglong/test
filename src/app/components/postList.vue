<template>
    <div>
        <div class="postContainer" v-for="post in postList" :key="post.title">
            {{post.content}}
        </div>
        <el-button type="primary" @click="getPostList()">获取</el-button>
        <!-- <img :src="imgb" /> -->
    </div>
</template>


<script>
import imga from '../../assets/images/logo.png'
export default {
    name: 'postList',
    data() {
        return {
            postList: [],
            imgb: imga
        };
    },
    mounted: function(){
        // this.postList = [
        //     {
        //         title: 'post1',
        //         content: 'content1',
        //         time: "2017"
        //     },{
        //         title: 'post2',
        //         content: 'content2',
        //         time: 2015
        //     },{
        //         title: 'post3',
        //         content: 'content3',
        //         time: 2016
        //     }
        // ];
    },
    methods: {
    	getPostList(){
            var self = this;
    		var url = self.serverUrl + '/api/getAllPosts/';
    		self.$http.get(url)
			    .then(function (response) {
                    // self.postList.contact(response.data);
                    // debugger;
                    response.data.forEach(function (element) {
                        self.postList.push({
                            title: element.title,
                            content: element.content
                        });
                    }, this);
                    console.log(self.postList);
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
</style>
