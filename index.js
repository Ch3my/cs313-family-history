// const PORT debe existir para que levante en Heroku
const PORT = process.env.PORT || 5000
const path = require('path')
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


const mysql = require('mysql')
var con = mysql.createConnection({
  host: "192.168.3.2",
  user: "acceso",
  password: "acceso",
  database: "cs313"
});

app.get('/', (req, res) => res.render('pages/index'))
app.get('/getPerson', function (req, res) {
  getPerson(req.query.id, (err, person) => {
    res.json(person)
  })
})
app.get('/getParents', function (req, res) {
  getParents(req.query.id, (err, person) => {
    res.json(person)
  })
})
app.get('/getChildren', function (req, res) {
  getChildren(req.query.id, (err, person) => {
    res.json(person)
  })
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

function getPerson(id, callback) {
  con.query("select * from person where id  = " + id, function (err, result, fields) {
    if (err) throw err;
    callback(null, result);
  });
}
function getParents(id, callback) {
  con.query("select f.firstName, f.lastName, f.dateOfBirth  from parents_children pc " +
    "inner join person p on p.id = pc.fk_personId " +
    "inner join person as f on f.id = pc.fk_parentId " +
    "where pc.fk_personId = " + id, function (err, result, fields) {
      if (err) throw err;
      callback(null, result);
    });
}
function getChildren(id, callback) {
  con.query("select p.firstName, p.lastName, p.dateOfBirth  from parents_children pc " +
    "inner join person p on p.id = pc.fk_personId " +
    "inner join person as f on f.id = pc.fk_parentId " +
    "where pc.fk_parentId = " + id, function (err, result, fields) {
      if (err) throw err;
      callback(null, result);
    });
}