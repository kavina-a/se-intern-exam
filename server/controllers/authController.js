const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signupUser = async (req, res) => {

  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save a new user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Password mismatch for email:", email); 
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token,userId: user._id, });

  } catch (err) {
    console.error("Error during login:", err);  
    res.status(500).json({ error: err.message });
  }
};

// const loginUser = async (req, res) => {

//   try {
//     const { email, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ email });
    
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // check password
//     const isMatch = await bcrypt.compare(password, user.password)
    
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Generate JWT token and send it in the response
//     const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.status(200).json({ token });
    
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = {signupUser, loginUser}