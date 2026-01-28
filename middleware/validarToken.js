import jwt from 'jsonwebtoken'

export const validarToken = (req, res, next) => {
  try {
    //recorta el token para separarlo del protocolo de envío.
    //extrae solo la cadena del token,
    //elimina la palabra clave "Bearer" de la cabecera HTTP
    const token = req.headers.authorization?.split(' ')[1]
    console.log("Token recibido:", token)

    if (!token) {
      return res.status(401).json({
        error: 'Token no proporcionado'
      })
    }

    // Verificar y decodifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    req.usuario = decoded
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'El token ha expirado'
      })
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Token inválido'
      })
    }

    res.status(500).json({
      error: 'Error al validar el token'
    })
  }
}
