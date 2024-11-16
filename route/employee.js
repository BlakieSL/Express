const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    const db = req.app.get('db');
    const sql =
        `SELECT employee.id, 
         employee.name, employee.birthdate, employee.address,
         category.id AS category_id, 
         category.name AS category_name
         FROM employee
         JOIN category ON employee.category_id = category.id`
    db.all(sql,[],(err, rows) => {
        if(err){
            return console.error(err.message);
        }
        res.render('index', {employees: rows})
    })

});




router.post('/', (req,res) => {
    const db = req.app.get('db');
    const { name, birthdate, address, category_id } = req.body;
    const sql = `INSERT INTO employee (name, birthdate, address, category_id) VALUES (?,?,?,?)`;

    db.run(sql, [name, birthdate, address, category_id], (err) => {
        if(err) {
            return console.error(err.message);
        }
        res.redirect('/employees');
    })
});

router.delete('/:id', (req, res) => {
    const db = req.app.get('db');
    const id = req.params.id;
    const sql = `DELETE FROM employee WHERE id = ?`;

    db.run(sql, [id], (err) => {
        if(err) {
            return console.error(err.message);
        }
        res.redirect('/employees');
    })
});

router.put('/:id', (req, res) => {
    const db = req.app.get('db');
    const id = req.params.id;
    const { name, birthdate, address, category_id } = req.body;
    const sql = `UPDATE employee SET name = ?, birthdate = ?, address = ?, category_id = ? WHERE id = ?`;

    db.run(sql, [name, birthdate, address, category_id, id], (err) => {
        if(err) {
            return console.error(err.message);
        }
        res.redirect('/employees');
    })
});

module.exports = router;