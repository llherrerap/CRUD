var express = require('express');
var router = express.Router();
const {conexion} = require('../database/conexion')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Create: Primera operacion CRUD, permite agregar registros a la base de datos
router.post('/agregar', (req, res) => {
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const fecha_nacimiento = req.body.fecha_nacimiento
  const correo = req.body.correo

  conexion.query(`INSERT INTO persona (nombre, apellido, fecha_nacimiento, correo) VALUES ('${nombre}','${apellido}', '${fecha_nacimiento}', '${correo}')`, (error, resultado) => {
    if (error) {
      console.log(`Ocurrio un error en la ejecución ${error}`)
      res.status(500).send('Error. Intentelo más tarde')
    } else {
      res.status(200).send('Persona agregada con exito')
    }
  })
})

module.exports = router;
