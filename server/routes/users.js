const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
	res.send('hello, ');
});

router.get('/:name', function (req, res) {
	res.send(req.params);
});

module.exports = router;
