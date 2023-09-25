import { Schema } from "mongoose";

const productSchema = new Schema ({
    nameProduct:{
        type: String,
        required: true,
        unique: true,
        maxLength: 50,
        minLength: 2
    },
    price:{
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
        unique: true,
        maxLength: 300,
        minLength: 10
    },
    category:{
        type: String,
        required: true,
        maxLength: 80,
        minLength: 2
    },
    quantity:{
        type: Number,
        
    }
})


const Product = mongoose.model("product", productSchema);

export default Product;