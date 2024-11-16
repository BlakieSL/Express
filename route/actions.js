const express = require('express');
const router = express.Router();

router.get('/add',(req,res)=>{
    const db = req.app.get('db');
    const sql = "SELECT id, name FROM category";
    db.all(sql, [], (err, rows) => {
       if(err) {
           return res.status(500).send(err.message);
       }
        res.render('add', { categories: rows });
    });
});

router.get('/update/:id', (req, res) => {
    const db = req.app.get('db');
    const id = req.params.id;

    const sqlEmployee = "SELECT * FROM employee WHERE id = ?";
    const sqlCategories = "SELECT id, name FROM category";

    db.get(sqlEmployee, [id], (err, employee) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (!employee) {
            return res.status(404).send('Employee not found');
        }

        db.all(sqlCategories, [], (err, categories) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            res.render('update', { employee, categories });
        });
    });
});

router.get('/delete/:id', (req, res) => {
    const db = req.app.get('db');
    const id = req.params.id;

    const sql = `
        SELECT employee.id, employee.name, employee.birthdate, employee.address,
               category.name AS category_name
        FROM employee
        JOIN category ON employee.category_id = category.id
        WHERE employee.id = ?
    `;

    db.get(sql, [id], (err, employee) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (!employee) {
            return res.status(404).send('Employee not found');
        }

        res.render('delete', { employee });
    });
});



module.exports = router;