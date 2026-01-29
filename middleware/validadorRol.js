export const validadorRol = (...rolesPermitidos) => {
	const roles = rolesPermitidos.flat(Infinity).map(r => String(r).toLowerCase()).filter(Boolean)

	return (req, res, next) => {
		try {
			if (!roles || roles.length === 0) {
				return res.status(500).json({ error: 'No se especificaron roles para validar' })
			}

			const usuario = req.usuario
			if (!usuario) {
				return res.status(401).json({ error: 'Token no válido o usuario no autenticado' })
			}

			// soportar varios formatos en el payload del token
			// - usuario.roles: array
			// - usuario.rol | usuario.role: string
			let usuarioRoles = []
			if (Array.isArray(usuario.roles) && usuario.roles.length) {
				usuarioRoles = usuario.roles.map(r => String(r).toLowerCase())
			} else if (usuario.rol) {
				usuarioRoles = [String(usuario.rol).toLowerCase()]
			} else if (usuario.role) {
				usuarioRoles = [String(usuario.role).toLowerCase()]
			}

			const permitido = usuarioRoles.some(r => roles.includes(r))

			if (!permitido) {
				return res.status(403).json({ error: 'Acceso denegado. Rol insuficiente' })
			}

			next()
		} catch (err) {
			console.error('validadorRol error:', err)
			res.status(500).json({ error: 'Error validando rol' })
		}
	}
}

export default validadorRol

