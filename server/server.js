var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogTest',{
	useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('mongodb connecting');
});

var PostSchema = mongoose.Schema({
	title: {type: String, required: true},
	body: {type: String},
	tag:{type: String, enum: ['技术', '生活']},
	postedTime: {type: Date, default: Date.now}
},{collection: 'post'});
var PostModel = mongoose.model("PostModel", PostSchema);

// app.use(cors());

// app.use(express.static(__dirname + '/src'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



// 跨域配置
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9090');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/api/getPostList/', getAllPosts);

app.post('/api/addPost/', function(req, res){
	var post = req.body;
	console.log(post);
	// PostModel.create(post);
    res.json(200);
});

function getAllPosts(req, res) {

}

var pornt = 3001;

app.listen(pornt,()=>{
	console.log('server listening on port ' + pornt + ':');
});
