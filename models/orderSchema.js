const mongoose = require('mongoose');
const {Schema} = mongoose;

const OrderSchema = new Schema({
    userId:{type: String , required: true},
    product: [
        {
            productId: {type: String , required: true},
            quantity: {type: Number , default: 1}
        }
    ],
    // address: {type: String , required: true},
    amount: {type: Number , required: true},
    status: {type: String , default: 'Pending' , required: true},
} , {timestamps: true})

mongoose.models = {}

export default mongoose.model('Order' , OrderSchema);