var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var promise = require('bluebird');
mongoose.Promise = promise;

mongoose.connect('mongodb://localhost/myBlog', {
	useMongoClient: true
});

app.use(cors());

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('mongodb connecting');
});

// 跨域配置
// app.use(function (req, res, next) {
//
// 	// Website you wish to allow to connect
// 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8082');
//
// 	// Request methods you wish to allow
// 	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS, POST, PUT, PATCH, DELETE');
//
// 	// Request headers you wish to allow
// 	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
// 	// Set to true if you need the website to include cookies in the requests sent
// 	// to the API (e.g. in case you use sessions)
// 	res.setHeader('Access-Control-Allow-Credentials', true);
//
// 	// Pass to next layer of middleware
// 	return next();
// });

app.use(cors({
	origin:['http://localhost:8081','http://localhost:8082'],
	methods:['GET','OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE'],
	alloweHeaders:['Content-Type', 'Authorization'],
	credentials: true
}));

var PostSchema = mongoose.Schema({
	title: {type: String, required: true},
	content: {type: String},
	tag: {type: String},
	postedTime: {type: Number}
}, {collection: 'post'});

var PostModel = mongoose.model('PostModel', PostSchema);

// app.use(cors());

// app.use(express.static(__dirname + '/src'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/getAllPosts/', getAllPosts);
app.post('/api/addPost/', addPost);
app.post('/api/deletePost/', deletePost);
app.get('/api/getPostDetail/', getPostDetail);

function deletePost(req, res) {
	var postId = req.body.postId;
	PostModel
		.remove({_id: postId})
		.then(
			function (status) {
				// res.sendStatus(200);
				var obj = {
					code: '20000',
					data: null,
					message: '删除成功！'
				};
				res.send(obj);
			},
			function (error) {
				var obj = {
					code: '400',
					data: null,
					message: error.message
				};
				res.send(obj);
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

function addPost(req, res) {
	var post = req.body;
	PostModel
		.create(post)
		.then(
			function (postObj) {
				var obj = {
					code: '20000',
					data: null,
					message: '发布成功'
				};
				res.send(obj);
			},
			function (error) {
				var obj = {
					code: '400',
					data: null,
					message: error.message
				};
				res.send(obj);
			}
		);
	// res.json(200);
}

function getPostDetail(req, res) {
	var postId = req.query.postId;
	PostModel
		.find({_id: postId})
		.then(
			function (postObj) {
				var obj = {
					code: '20000',
					data: postObj[0]._doc,
					message: '获取文章详情成功！'
				};
				res.send(obj);
			},
			function (error) {
				var obj = {
					code: '400',
					data: null,
					message: error.message
				};
				res.send(obj);
			}
		)
}

var pornt = 3002;

app.listen(pornt, ()=> {
	console.log('server listening on port ' + pornt + ':');
});
