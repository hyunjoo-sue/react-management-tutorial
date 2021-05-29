const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


const test = require('./server/config');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

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

const multer = require('multer');
const { Console } = require('console');
const upload = multer({dest: './upload'})


app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * \
       FROM management.customer \
      WHERE ISDELETED = 0",
    (err, rows, fields) => {
      res.send(rows)
    }

  )

});

app.use('/image', express.static('./upload'))   // image이름으로 접근 하는데 실제로는 upload 폴더와 연결???

app.post('/api/customers', upload.single('image'), (req, res) => {
  console.log(req.file.filename)

  let sql = 'INSERT INTO MANAGEMENT.CUSTOMER VALUES (NULL, ?, ?, ?, ?, ?, NOW(), 0)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];

  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);

    console.log(rows)
    console.log('----end')
    test.test();
  })
})

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE MANAGEMENT.CUSTOMER SET ISDELETED = 1 \
              WHERE ID = ?';
  console.log(req.params.id)
  console.log(sql)
  let params = [req.params.id];
  connection.query(sql, params, 
    (err, rows, fields) => {
      res.send(rows)
    })
})



process.on('uncaughtException', (err) => {

  console.error("죽지마 ㅠㅠ");
  console.error(err);
 
// retruen것이 없기 때문에 process를 종료시켜 줘야함돠!
  process.exit(1);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

