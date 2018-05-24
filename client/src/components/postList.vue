<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-for="post in postList" :key="post._id">
      <h2>{{post.title}}</h2>
      <div>{{post.postedTime}}</div>
      <div>{{post.content}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "My Blog",
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

      self.$http
        .get(url)
        .then(function(response) {
          // self.postList = response.data;
          var array = response.data;
          for (var i = 0; i < array.length; i++) {
            array[i].postedTime = self.$moment(array[i].postedTime).format("YYYY-MM-DD");
          }
          self.postList = array;
        })
        .catch(function(error) {
          console.log("error");
        });
    },
    deletePost(post) {
      var self = this;
      var url = self.serverUrl + "/api/deletePost/";
      var data = {
        postId: post.postId
      };
      self.$http
        .post(url, data)
        .then(function(response) {
          self.getPostList();
        })
        .catch(function(error) {
          console.log("error");
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
