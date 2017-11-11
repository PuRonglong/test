var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var cors = require('cors');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myBlog',{
	useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('mongodb connecting');
});

var PostSchema = mongoose.Schema({
	title: {type: String, required: true},
	content: {type: String},
	tag:{type: String, enum: ['技术', '生活']},
	postedTime: {type: Date, default: Date.now}
},{collection: 'post'});
var PostModel = mongoose.model('PostModel', PostSchema);

// app.use(cors());

// app.use(express.static(__dirname + '/src'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// 跨域配置
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9090');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS, POST, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/api/getAllPosts/', getAllPosts);
app.post('/api/addPost/', addPost);
app.post('/api/deletePost/', deletePost);

function deletePost(req, res) {
	var postId = req.body.postId;
	PostModel
		.remove({_id: postId})
		.then(
			function (status) {
				res.sendStatus(200);
			},
			function (error) {
				res.sendStatus(400);
			}
		);
}

function getAllPosts(req, res) {
	PostModel
		.find()
		.then(
			function (posts) {
				res.json(posts);
			},
			function (error) {
				res.sendStatus(400);
			}
		);
}

function addPost(req, res){
	var post = req.body;
	PostModel
		.create(post)
		.then(
			function (postObj) {
				res.end(200);
			},
			function (error) {
				res.sendStatus(400);
			}
		);
	res.json(200);
}

var pornt = 3001;

app.listen(pornt,()=>{
	console.log('server listening on port ' + pornt + ':');
});
