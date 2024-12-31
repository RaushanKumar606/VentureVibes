const { z } = require('zod'); 

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); 
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const message = err.errors[0]?.message || "Validation error"; 
      res.status(400).json({ message });
    } else {
      next(err); 
    }
  }
};

module.exports = { validate };
