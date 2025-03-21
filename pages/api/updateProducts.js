import connectMongoose from "../../middleware/db";
import Product from "../../models/productSchema";

const handler = async (req, res) => {
  if (req.method === "POST") {
      for (var index = 0; index < req.body.length; index++) {
      let product_body = await Product.findByIdAndUpdate(req.body[index]._id , req.body[index])
      res.status(200).json({ product_body});
    }

  } else {
    res.status(400).json({ message: "This Method is Not Allowed" });
  }
};

export default connectMongoose(handler);
