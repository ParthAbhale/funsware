import connectMongoose from "../../middleware/db";
import User from "../../models/userSchema"

const handler = async (req, res) => {
  if (req.method === "POST") {
        let user = await User.findById(req.body._id);
        user.cart = req.body.cart;
        res.json(user)

  } else {
    res.status(400).json({ message: "This Method is Not Allowed" });
  }
};

export default connectMongoose(handler);
