const {z} =require('zod')

const toursSchemaValidation=z.object({
    title:z
    .string({required:true})
    .min(3, 'Title must be at least 3 characters long')
    .trim()
    .nonempty({ message: "Name is required" })
    .max(50, 'Title must be at most 50 characters long'),
    price:z
    .number({required:true})
    .min(1, 'Price must be at least 1')
   
    .max(100000, 'Price must be at most 100000'),
    location:z
    .string({required:true})
    .min(3, 'Location must be at least 3 characters long')
    .nonempty({ message: "Location is required" })
    .max(110),
    description:z
    .string({required:true})
    .nonempty({ message: "Description is required" })
    .min(10, 'Description must be at least 10 characters long')
    .max(500, 'Description must be at most 500 characters long'),
    country:z
    .string({required:true})
    .nonempty({ message: " Country Name is required" })
    .min(3, 'Country must be at least 3 characters long')
    .nonempty({ message: "Country is required" })
});
module.exports={toursSchemaValidation}