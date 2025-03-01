const { z } = require('zod');

// Define login validation schema
const loginValidationSchema = z.object({
  email: z
  .string({ required_error: "Email is required" })
  .email({ message: "Invalid email address" }) // This checks for valid email format
  .min(2, { message: "Email must be 5 or more characters long" })
  .max(30, { message: "Email must be 30 or fewer characters long" })
  .trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[!@#$%^&*]/, { message: 'Password must contain at least one special character' })
    .regex(/\d/, { message: 'Password must contain at least one number' }),
});

module.exports = { loginValidationSchema };
