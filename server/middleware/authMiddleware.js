// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Add user to the request object
//     console.log("Decoded token:", decoded); 
//     next();
//   } catch (err) {
//     res.status(403).json({ message: 'Invalid token' });
//   }
// };

// module.exports = authMiddleware;


const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' }); 
  }

  try {
    //decoding section
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    next(); 
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' }); 
  }
};

module.exports = authMiddleware;