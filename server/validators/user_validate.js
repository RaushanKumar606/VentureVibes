const { z } = require('zod');

 const userValidationSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .trim(),
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  number: z
    .string()
    .regex(/^\d{10}$/, { message: "Number must be a valid 10-digit number" }),
  country: z
    .string()
    .nonempty({ message: "Country is required" })
    .trim(),
  isAdmin: z.boolean().optional(), // Optional, defaults to false in the Mongoose model
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" }),
});

module.exports={userValidationSchema}