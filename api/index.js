
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => console.log('listening on port 3000'))

const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Casd9913!",
    database: "mwi",
    connectionLimit: 10
})

function dbDataHome(callback) {
     con.query(`select * from mwi.homecontent`, (err, data) => {
        if (err) throw err;
        callback(data);
    })
}

function dbDataContact(callback) {
    con.query(`select * from mwi.content`, (err, data) => {
        if (err) throw err;
        callback(data);
    })
}

app.get("/api/home", (req, res) => {
    content = [];
    dbDataHome(function (data) {
        content = data;
        res.status(200).send({
            "status": true,
            "data": content
        })
    })
});


app.get('/api/contact', (req, res) => {
    content = [];
    dbDataContact(function (data) {
        content = data;
        res.status(200).send({
            "status": true,
            "data": content
        })
    })
});

app.post('/api/contact/form', (req, res) => {
    var sql = `INSERT into messages (firstName, lastName, email, title, message) values ('${req.body.fname}', '${req.body.lname}', '${req.body.email}', '${req.body.title}', '${req.body.comment}')`;
    con.query(sql, function(err) {
        if (err) {
            res.status(400).json('Message failed to send')
            throw err;
        } else {
            console.log("entry added")
            console.log(req.body)
            res.status(200).json("Message Recieved")
        }
    })
})