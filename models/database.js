var pg = require('pg');
var connectionString = process.env.DATABASE_URL;
var client = new pg.Client(connectionString);
var userTable = 'CREATE TABLE IF NOT EXISTS users(ID INT PRIMARY KEY NOT NULL, NAME TEXT NOT NULL, EMAIL VARCHAR(100) NOT NULL)';
var itemTable = 'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)';

pg.connect(connectionString, function(err, client, done){
    if(err){ console.log('connecting encountered an error, ' + err); }
    
    client.query(itemTable, function(err){
      if(err) { console.log('Creating the table encountered an error, ' + err); }
      client.end();
    });
});