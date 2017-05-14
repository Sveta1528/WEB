const app = require('express')();

app.use(require('body-parser').urlencoded({ extended: true }));

require('mongodb').MongoClient.connect(require('./db').url, (err, database) => {
  const port = 9000;
  if (err) return console.log(err)
  require('./routes')(app, database);
  app.listen(port, () => {console.log('Port:' + port);});
})
