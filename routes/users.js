var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
const client = new MongoClient("mongodb://localhost:27017")

/* GET users listing. */
router.get('/', async function(req, res, next) {
	await client.connect()
	const db = client.db('learn')
	var data = await db.collection('customer').find().toArray()
	res.json(data)
  // res.send('respond with a resource');
});

module.exports = router;
