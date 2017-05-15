module.exports = function(app, db) {
  // POST
  app.post('/records', (req, res) => {
      db.collection('records').insert({ text: req.body.text, title: req.body.title }, (err, result) => {
        if (!err) { res.send('Record added')
        ;}
        else { res.send('Error')}
      });
    });

    // GET
    app.get('/records/:title', (req, res) => {
      db.collection('records').findOne({ 'title': req.params.title }, (err, result) => {
        if (!err) { res.send(result);}
        else { res.send('Error')}
      });
    });

    // DELETE
    app.delete('/records/:title', (req, res) => {
    db.collection('records').remove({ 'title': req.params.title }, (err, result) => {
      if (!err) { res.send('Record deleted');}
      else { res.send('Error')}
    });
    });

    // PUT
    app.put ('/records/:title', (req, res) => {
      const record ={ text: req.body.text, title: req.body.title };
      db.collection('records').update({ 'title': req.params.title }, record, (err, result) => {
        if (!err) { res.send(record);}
        else { res.send('Error')}
      });
    });
};
