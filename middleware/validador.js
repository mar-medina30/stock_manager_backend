export const validador = (schema, property = 'body') => {
  return (req, res, next) => {
    console.log(req[property])
    const { error, value } = schema.validate(req[property], {
      abortEarly: false
    });

    if (error) {
      return res.status(400).json({
        message: 'Error de validación',
        errors: error.details.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      });
    }

    req.bodyValidado = value; // datos sanitizados
    next();
  };
};
