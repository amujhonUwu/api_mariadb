const { Router } = require('express');
const router = Router();

const pool = require("../controller/db.js")
clientes = require("../samples.json")
console.log(clientes);




router.get('/', async function(req, res) {
    try {
        const sqlQuery = 'SELECT * FROM cliente';
        const clientes = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(clientes);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/:id', async function(req, res) {
    try {
        const sqlQuery = `SELECT cedula, nombre_1, nombre_2, apellido_1, apellido_2 FROM cliente WHERE id=?;`;
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
    res.status(200).json({id:req.params.id})
})

router.delete('/:id', async function(req, res) {
    try {
        const sqlQuery = `DELETE FROM cliente WHERE id=?;`;
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
    res.status(200).json({id:req.params.id})
})


function existe_cedula(req, res, cedula){
    const sqlQuery = `SELECT COUNT(*) FROM cliente WHERE cedula = ${cedula}`;
    return (sqlQuery == 0);

}

router.post('/', async function(req, res) {
    const { cedula, nombre_1, nombre_2, apellido_1, apellido_2 } = req.body;
    if (cedula && nombre_1 && nombre_2 && apellido_1 && apellido_2){
        if(existe_cedula() == false){
            const newClient = {...req.body};
            try {
                const sqlQuery = 'INSERT INTO cliente (cedula, nombre_1, nombre_2, apellido_1, apellido_2) VALUES (?,?,?,?,?)';
                const result = await pool.query(sqlQuery, [cedula, nombre_1, nombre_2, apellido_1, apellido_2]);
                res.status(200).json({userId: result.insertId});
            } catch (error) {
                res.status(400).send(error.message)
            }
        } else{
            res.send(`Ya existe un usuario con al cedula ${cedula}`);
        }
    }
    else {
        res.send('Datos de cliente incompletos.');
    }
    
});

module.exports = router;