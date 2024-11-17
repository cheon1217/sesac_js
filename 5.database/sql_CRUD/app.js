const express = require("express");
const sqlite3 = require("sqlite3");
const ejs = require("ejs");
const path = require("path");

const app = express();
const port = 3000;

const db_name = path.join(__dirname, "data", "apptest.db");
const db = new sqlite3.Database(db_name, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful connection to the database 'apptest.db'");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

const sql_create = `CREATE TABLE IF NOT EXISTS Books (
    Book_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title VARCHAR(100) NOT NULL,
    Author VARCHAR(100) NOT NULL,
    Comments TEXT
)`;

db.run(sql_create, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of the 'Books' table!");
});

const sql_insert = `INSERT INTO Books (Title, Author, Comments) VALUES 
    ('Mrs. Bridge', 'Evan S. Connell', 'First in the serie'),
    ('Mr. Bridge', 'Evan S. Connell', 'Second in the serie'),
    ('ingénue libertine', 'Colette', 'Minne + Les égarements de Minne')`;

db.run(sql_insert, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful creation of 3 books");
})

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/data", (req, res) => {
    const test = {
        title: "Test",
        items: ["one", "two", "three"]
    };
    res.render("data", {model: test});
});

app.get("/books", (req, res) => {
    const sql = "SELECT * FROM Books ORDER BY Title";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.render("book", {model: rows});
    });
});

app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM Books WHERE Book_ID = ?";
    db.get(sql, id, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        res.render("edit", {model: row});
    });
});

app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const book = [req.body.Title, req.body.Author, req.body.Comments, id];
    const sql = "UPDATE Books SET Title = ?, Author = ?, Comments = ? WHERE Book_ID = ?";
    db.run(sql, book, err => {
        if (err) {
            console.error(err.message);
        }      
        res.redirect("/books");
    })
});

app.get("/create", (req, res) => {
    res.render("create", {model: {}});
});

app.post("/create", (req, res)=>{
    const book = [req.body.Title, req.body.Author, req.body.Comments];
    const sql = "INSERT INTO Books (Title, Author, Comments) VALUES (?, ?, ?)";
    db.run(sql, book, err=> {
      if(err){
        console.error(err.message);
      }
      res.redirect("/books");
    });
  });
  
  
  app.get("/delete/:id", (req, res)=>{
    const id = req.params.id;
    const sql = "SELECT * FROM Books WHERE Book_ID=?";
    db.get(sql, id, (err, row)=>{
      if(err) {
        console.error(err.message);
      }
      res.render("delete", {model: row});
    });
  });
  
  app.post("/delete/:id", (req, res)=> {
    const id = req.params.id;
    const sql = "DELETE FROM Books WHERE Book_ID=?";
    db.run(sql, id, err =>{
      if(err) {
        console.error(err.message);
      }
      res.redirect("/books");
    });
  });

app.listen(port, () => {
    console.log("Server Ready");
});