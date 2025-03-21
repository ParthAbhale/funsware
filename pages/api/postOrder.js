import connectMongoose from "../../middleware/db";
import Order from '../../models/orderSchema'

const handler = async (req, res) => {
  if (req.method === "POST") {
      const { userId, order , status,amount, address} = req.body;
      let arr = [];
      for (let index = 0; index < Object.keys(order).length; index++) {  
        arr.push({
          productId: order[Object.keys(order)[index]].id,
          quantity: order[Object.keys(order)[index]].qty
      })  
      console.log(order[Object.keys(order)[index]])    
      }
      const full_order = await Order({
        userId: userId,
        product: arr,
      address: address,
      amount: amount,
      status: status,
      })

      await full_order.save()

      res.status(200).json({full_order , success: true})


      // console.log(order[Object.keys(order)[0]].id)
      // console.log( userId, order , status, address)
  } else {
    res.status(400).json({ message: "This Method is Not Allowed" });
  }
};

export default connectMongoose(handler);
