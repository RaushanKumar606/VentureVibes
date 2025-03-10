
const mongoose = require("mongoose");
const { Schema } = mongoose;
const toursSchema= new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        url:String,
        filename:String,
        // filename: { type: String, default: 'default-image.jpg' },
        // url: { type: String, default: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" }
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"  
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

});
const Tours = mongoose.model("Tour", toursSchema);
module.exports = Tours;