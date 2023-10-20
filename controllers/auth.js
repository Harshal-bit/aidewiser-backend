import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


/* REGISTER USER */
export const register = async (req, res) => {
    
  try {
    const {
      fullname,
      email,
      password,
      cpassword
      
    } = req.body;

    console.log(req.body);

    if (password !== cpassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: passwordHash
    });
    const user = await User.findOne({ email: email });
    if(user) {
        return res.error({error:'User already exists'})
    }
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */



export const login  = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    
    let abstractuser = {
      fullname : user.fullname,
      email : user.email,
    }
    
    res.status(200).json({ token, user:abstractuser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
