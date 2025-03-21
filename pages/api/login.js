import connectMongoose from "../../middleware/db";
import User from "../../models/userSchema"
import CryptoJS from 'crypto-js'

const handler = async (req, res) => {
  if (req.method === "POST") {
        let user = await User.findOne({email: req.body.email});
        if(user){
            try {
                const bytes = CryptoJS.AES.decrypt(user.password, 'secret key 123')
                const pas = bytes.toString(CryptoJS.enc.Utf8);
                if(pas === req.body.password && user.email === req.body.email){
                    res.status(200).json({success: true , message: "Logged in Successfully" , type: 'success' , id: user._id});
                }else{
                    res.status(404).json({success: false , message: "Incorrect Password",type:"error"});
                }
            } catch (error) {

                 res.status(400).json({success: false , message: "Something went wrong , Please try later" , type:"error"});   
            }
        }else{
            res.send(404).json({success: false , message: "No user found , Please Sign up first",type:"error"});
        }
  } else {
    res.status(400).json({ message: "This Method is Not Allowed" });
  }
};

export default connectMongoose(handler);
