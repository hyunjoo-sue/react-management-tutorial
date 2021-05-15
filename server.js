const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json')
const conf = JSON.parse(data);
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  databae: conf.database
});

connection.connect();


app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM management.customer",
    (err, rows, fields) => {
      res.send(rows)
    }

  )


/*   res.send([

    {
      'id' : 1,
      'image' : 'https://placeimg.com/64/64/any',
      'name' : '이현주',
      'birthday' : '961222',
      'gender' : '여자',
      'job' : '학생'
    },
    {
      'id' : 2,
      'image' : 'https://placeimg.com/64/64/any',
      'name' : '이현주2',
      'birthday' : '961222',
      'gender' : '여자',
      'job' : '학생2'
    },
    {
      'id' : 3,
      'image' : 'https://placeimg.com/64/64/any',
      'name' : '이현주3',
      'birthday' : '961222',
      'gender' : '여자',
      'job' : '학생3'
    }
  ]); */
});


app.listen(port, () => console.log(`Listening on port ${port}`));

