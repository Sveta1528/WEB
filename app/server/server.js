const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const database       = require('./db');
const port           = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

MongoClient.connect(database.url, (err, database) => {
  if (err) return console.log(err)
  require('./routes')(app, database);
  app.listen(port, () => {
    console.log('Port:' + port);
  });
})
