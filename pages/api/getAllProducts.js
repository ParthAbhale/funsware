import connectMongoose from '../../middleware/db'
import Product from '../../models/productSchema'


const handler = async (req, res) => {
    let products = await Product.find()
    let newProducts = {}
    for(let items of products) {
        if(items.productName in newProducts) {
                if(!newProducts[items.productName].color.includes(items.color) && newProducts[items.productName].productQty > 0){
                    newProducts[items.productName].color.push(items.color)
                }
                if(!newProducts[items.productName].size.includes(items.size) && newProducts[items.productName].productQty > 0){
                    newProducts[items.productName].size.push(items.size)
                }
        }else{
                newProducts[items.productName] = JSON.parse(JSON.stringify(items)) 
                if(newProducts[items.productName].productQty > 0){
                    newProducts[items.productName].color = [items.color];
                    newProducts[items.productName].size = [items.size];
                }
        }
    }
    res.status(200).json({newProducts})
}

export default connectMongoose(handler)