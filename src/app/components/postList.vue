<template>
    <div>
        <div class="postContainer" v-for="post in postList" :key="post.time">
            {{post.content}}
        </div>
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
        this.postList = [
            {
                title: 'post1',
                content: 'content1',
                time:2017
            },{
                title: 'post2',
                content: 'content2',
                time:2015
            },{
                title: 'post3',
                content: 'content3',
                time:2016
            }
        ];
    }
};
</script>

<style>
.postContainer{
    margin-bottom: 20px;
}
</style>
