const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'yasser131200',
    database: 'cruddatabase'
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());

app.get('/api/get', (req, res) =>{
    const sqlSelect = "SELECT * FROM movie_reviews "
    db.query(sqlSelect,(err, result)=>{
    // res.send('hello yasser')
    res.send(result)
    });
})

app.post("/api/insert", (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)"
    db.query(sqlInsert, [movieName, movieReview] ,(err, result)=>{
    // res.send('hello yasser')
    console.log(result)
    });
})
app.delete("/api/delete", (req, res)=>{
    const name = req.body.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
    db.query(sqlDelete, name, (err, result)=>{
        if(err) console.log(err)
    })
})


app.listen(3001,() => {
    console.log('runing on port 3001')
})