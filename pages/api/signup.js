import connectMongoose from "../../middleware/db";
import User from "../../models/userSchema"
import CryptoJS from "crypto-js"

const handler = async (req, res) => {
  const {first_name, last_name ,email, password} = req.body;
  if (req.method === "POST") {
        let credentials = await User({first_name: first_name, last_name: last_name , email: email, password: CryptoJS.AES.encrypt(password, 'secret key 123').toString()})

        credentials.save()
        
        res.status(200).json({credentials})
  } else {
    res.status(400).json({ message: "This Method is Not Allowed" });
  }
};

export default connectMongoose(handler);
