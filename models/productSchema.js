import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema({
    productName:{type: String , required: true},
    slug:{type: String , required: true , unique: true},
    desc:{type: String , required: true},
    img:{type: String , required: true},
    price:{type: Number , required: true},
    productQty:{type: Number , required: true},
    category:{type: String , required: true},
    color:{type:String},
    size:{type:String},
} , {timestamps: true})


mongoose.models = {}


export default mongoose.model('Product' , ProductSchema);