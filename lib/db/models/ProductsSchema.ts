import mongoose  from "mongoose";   

const ProductSchema = new mongoose.Schema({
    productname: String,
    description: String,
    images: [String],
    category: String,
    price: Number,
    ratings: Number
})


// export default Product
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
