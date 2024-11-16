const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const employeeRoutes = require('./route/employee');
const categoryRoutes = require('./route/actions');
const methodOverride = require('method-override');

const app = express();
app.listen(3000, () => {
  console.log('Server started (http://localhost:3000/employees/)!');
});

const db = new sqlite3.Database('./chinook.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('DB connected');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS employee (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    birthdate TEXT NOT NULL,
    address TEXT NOT NULL,
    category_id INTEGER,
    FOREIGN KEY(category_id) REFERENCES category(id)
  )`);

  /*
  db.run(`INSERT INTO category (name) VALUES 
    ('Backend Developer'),
    ('Frontend Developer'),
    ('Full-Stack Developer'),
    ('UI/UX Designer')
  `);

  db.run(`INSERT INTO employee (name, birthdate, address, category_id) VALUES 
    ('Alice', '1990-05-10', '123 Main St', 1),
    ('Bob', '1985-07-21', '456 Maple Ave', 2),
    ('Charlie', '1992-11-30', '789 Oak Blvd', 3),
    ('Diana', '1988-03-14', '101 Pine Rd', 4),
    ('Eve', '1995-09-25', '202 Birch St', 1)
  `);
   */

});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('db', db);

app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/employees', employeeRoutes);
app.use('/actions', categoryRoutes);