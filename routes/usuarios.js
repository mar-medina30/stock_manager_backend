import express from 'express'
import * as usuariodb from "../modelos_db/usuarios.js"
import iniciardb from "../modelos_db/conexion_db.js"
import { usuarioCrearSchema, usuarioLoginSchema } from '../validaciones/usuarios.js'
import { validador } from '../middleware/validador.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const conexion = await iniciardb()
const router = express.Router()

// RUTA PARA CREAR UN NUEVO USUARIO
router.post('/crear', validador(usuarioCrearSchema), async (req, res) => {
    try {
        const { nombre, email, password, activo = true } = req.body

        // Verificar si el usuario ya existe
        const usuarioExistente = await usuariodb.obtenerUsuarioPorEmail(conexion, email)
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El email ya está registrado' })
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        // Crear el usuario
        const usuario = await usuariodb.crearUsuario(conexion, nombre, email, passwordHash, activo)

        res.json({
            mensaje: 'Usuario creado exitosamente',
            usuarioID: usuario.insertId,
            nombre,
            email,
            activo
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error al crear el usuario' })
    }
})

// RUTA PARA LOGUEAR UN USUARIO
router.post('/login', validador(usuarioLoginSchema), async (req, res) => {
    try {
        const { email, password } = req.body

        // Buscar el usuario por email
        const usuario = await usuariodb.obtenerUsuarioPorEmail(conexion, email)
        if (!usuario) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' })
        }

        // Verificar la contraseña
        const passwordValida = await bcrypt.compare(password, usuario.password_hash)
        if (!passwordValida) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' })
        }

        // Crear el access token
        const accessToken = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                nombre: usuario.nombre
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        // Login exitoso
        res.json({
            mensaje: 'Login exitoso',
            usuarioID: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            accessToken
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Error al loguear' })
    }
})

export default router
