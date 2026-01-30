import express from 'express'
import * as roldb from "../modelos_db/rol.js"
import iniciardb from "../modelos_db/conexion_db.js"
import { validarToken } from '../middleware/validarToken.js'
import { validadorRol } from '../middleware/validadorRol.js'

const conexion = await iniciardb()
const router = express.Router()

router.post('/crearRol', validadorRol('admin'), async (req, res) => {
    try {
        const { nombre } = req.body

        if (!nombre) {
            return res.status(400).json({ error: 'Falta el nombre del rol' })
        }

        // evitar duplicados
        const existente = await roldb.obtenerRolPorNombre(conexion, nombre)
        if (existente) {
            return res.status(409).json({ error: 'El rol ya existe' })
        }

        const resultado = await roldb.crearRol(conexion, nombre)
        res.status(201).json({ mensaje: 'Rol creado correctamente', id: resultado.insertId, nombre })
    } catch (err) {
        console.error('Error crearRol route:', err)
        res.status(500).json({ error: 'Error creando el rol' })
    }
})

export default router
