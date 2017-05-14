
module.exports = function(app, db) {
  // POST
  app.post('/records', (req, res) => {
      db.collection('records').insert({ text: req.body.body, title: req.body.title }, (err, result) => {
        if (!err) { res.send('Record added');}
        else { res.send('Error')}
      });
    });

};
