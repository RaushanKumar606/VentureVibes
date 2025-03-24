const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema(
    {
        reviews:{
            type:String,
            required: true,
        },
        rating:{
            type:Number,
            min: 1,
            max: 5,
            required: true,
        },
        createAt:{
            type: Date,
            default: () => Date.now()
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true ,
        }
    }
)
const Review = mongoose.model("Review",reviewSchema)
 module.exports =  Review;