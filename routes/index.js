var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://jvisca:Bustersh0t@localhost:5432/todos';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//INSERT
router.post('/api/v1/todos', function(req, res) {
  
  var results = [];
  var data = {text: req.body.text, complete: req.body.complete};
  
    pg.connect(connectionString, function(err, client, done){
      
        client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);
        processQueries(res, err, client, done, results);
      
    });
});

//GET
router.get('/api/v1/todos', function(req, res){
  
  var results = [];
  
    pg.connect(connectionString, function(err, client, done){
      
        processQueries(res, err, client, done, results);
        
    });
});

//UPDATE
router.put('/api/v1/todos/:todo_id', function(req, res){
  
  var results = [];
  var id = req.params.todo_id;
  var data = {text: req.body.text, complete: req.body.complete};
  
    pg.connect(connectionString, function(err, client, done) {
        
        client.query('UPDATE items SET text=($1), complete=($2) WHERE id=($3)', [data.text, data.complete, id]);
        processQueries(res, err, client, done, results);
      
    });
});

//DELETE
router.delete('/api/v1/todos/:todo_id', function(req, res){
  var results = [];
  var id = req.params.todo_id;
  
    pg.connect(connectionString, function(err, client, done){
        
        client.query('DELETE FROM items WHERE id=($1)', [id]);
        processQueries(res, err, client, done, results);
      
    });
});

function processQueries(res, err, client, done, results){
  
    var query = client.query('SELECT * FROM items ORDER BY id ASC');
    
    query.on('row', function(row) {
      results.push(row);
    });
    
    query.on('end', function() {
      client.end();
      return res.json(results);
    });
    
    if(err)
      console.log('There was an error deleting the record from the database, ' + err);
    
} 

module.exports = router;
