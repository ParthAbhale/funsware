const mongoose = require('mongoose');


const connectMongoose = handler => async (req, res) => {
    if(mongoose.connections[0].readyState){
        return handler(req ,res)
        console.log("Connected to Mongoose")
    }
    await mongoose.connect(process.env.MONGOOSE_URI)
    console.log("Connected to Mongoose")
    return handler(req ,res)
}

export default connectMongoose 