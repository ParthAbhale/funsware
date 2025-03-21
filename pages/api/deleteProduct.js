import connectMongoose from '../../middleware/db'
import Product from '../../models/productSchema'


const handler = async (req, res) => {
    if(req.method === 'DELETE'){

        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        // res.json({deletedProduct})
        console.log("Yes")
    }
}

export default connectMongoose(handler)