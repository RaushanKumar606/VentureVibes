const { z } = require('zod');

 const userValidationSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .trim(),
    email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }) // This checks for valid email format
    .min(2, { message: "Email must be 5 or more characters long" })
    // .max(40, { message: "Email must be 40 or fewer characters long" })
    .trim(),
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
    .min(2, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character" })
    .regex(/\d/, { message: "Password must contain at least one number" }),
});

module.exports={userValidationSchema}