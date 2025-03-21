import connectMongoose from "../../middleware/db";
import Product from "../../models/productSchema";

const handler = async (req, res) => {
  if (req.method === "POST") {
      for (var index = 0; index < req.body.length; index++) {
      let product_body = new Product({
        productName: req.body[index].productName,
        slug: req.body[index].slug,
        desc: req.body[index].desc,
        img: req.body[index].img,
        price: req.body[index].price,
        productQty: req.body[index].productQty,
        category: req.body[index].category,
        color: req.body[index].color,
        size: req.body[index].size,
      });
      await product_body.save();
      res.status(200).json({ product_body});

    }

  } else {
    res.status(400).json({ message: "This Method is Not Allowed" });
  }
};

export default connectMongoose(handler);
