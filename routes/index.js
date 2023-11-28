var express = require('express');
var router = express.Router();
const {conexion} = require('../database/conexion')

//Read: Segunda operacion CRUD, permite leer los registros de la base de datos
router.get('/', function(req, res, next) {
  conexion.query('SELECT * FROM persona;', (error, resultado) => {
    if (error) {
      console.log(`Ocurrio un error en la ejecución ${error}`)
      res.status(500).send('Error. Intentelo más tarde')
    } else {
      res.status(200).render('index', {resultado, opcion: 'disabled', estado: true})
    }
  })
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
      res.status(200).redirect('/')
    }
  })
})

//Update: Tercera operación del CRUD, permite actualizar registros en la base de datos

//Enrutamiento para activar los campos y poder editar
router.get('/activar', (req, res) => {
  conexion.query('SELECT * FROM persona;', (error, resultado) => {
    if (error) {
      console.log(`Ocurrio un error en la ejecución ${error}`)
      res.status(500).send('Error. Intentelo más tarde')
    } else {
      res.status(200).render('index', {resultado, opcion: ''})
    }
  })
})

//Enrutameinto para actualizar por id
router.post('/actualizar/:id', (req, res) => {
  //Parametro de la URL id
  const id = req.params.id
  //Datos que se envian por el formulario
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const fecha_nacimiento = req.body.fecha_nacimiento
  const correo = req.body.correo
  conexion.query(`UPDATE persona SET nombre='${nombre}', apellido='${apellido}', fecha_nacimiento='${fecha_nacimiento}', correo='${correo}' WHERE id=${id}`, (error, resultado) => {
    if (error) {
      console.log(`Ocurrio un error en la ejecución ${error}`)
      res.status(500).send('Error. Intentelo más tarde')
    } else {
      res.status(200).redirect('/')
    }
  })
})

//Delete: Ultima operación del CRUD que permite eliminar registros de la base de datos
router.get('/eliminar/:id', (req, res) => {
  const id = req.params.id
  conexion.query(`DELETE FROM persona WHERE id=${id}`, (error, resultado) => {
    if (error) {
      console.log(`Ocurrio un error en la ejecución ${error}`)
      res.status(500).send('Error. Intentelo más tarde')
    } else {
      res.status(200).redirect('/')
    }
  })
})

module.exports = router;
