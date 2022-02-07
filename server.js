
const express = require('express')
const {MongoClient, ObjectID} = require('mongodb');


const app = express()
const port = 3000
const database_url = 'mongodb://localhost:27017/db1'

app.get('/', function(req, res) {
  res.json({hello: "world"})
})

app.get('/small', (req, res) => {
  const db = req.app.locals.db;
  const id = new ObjectID("61fe1f5b7a71d171d070159e");
  const client = db.db("db1")
  client.collection("test").findOne({_id:id})
    .then(data => {
      res.json(data)
    })
})

app.get('/medium', (req, res) => {
  const db = req.app.locals.db;
  const id = new ObjectID("61fe2401b626f30564803aa2");
  const client = db.db("db1")
  client.collection("test").findOne({_id:id})
    .then(data => {
      res.json(data)
    })
})

/*


use db1
switched to db db1
db1> db.test.insert({name: "hello", value: "world"});
DeprecationWarning: Collection.insert() is deprecated. Use insertOne, insertMany, or bulkWrite.
{
  acknowledged: true,
  insertedIds: { '0': ObjectId("61fe1f5b7a71d171d070159e") }
}
db1>

*/




// Mongo connect
MongoClient.connect(database_url, { poolSize:20 }, (err, db) => {
  if (err) {
    logger.warn(`Failed to connect to the database. ${err.stack}`);
  }
  app.locals.db = db;
  app.listen(port, () => {
    console.info(`Node.js app is listening at http://localhost:${port}`);
  });
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
