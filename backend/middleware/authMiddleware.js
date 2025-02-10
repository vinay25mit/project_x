// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   console.log("dekho auth krne aaya");
//   console.log("response in auth Middle ware",req);

//   const authHeader = req.header("Authorization");
//   const token = authHeader.split(" ")[1];

//   // console.log("req in auth middle",req)
//   console.log("req header", req.header);

//   console.log("token is backend", token);

//   if (!token) {
//     return res.status(401).json({ error: "Access Denied" });
//   }

//   try {
//     const verified = jwt.verify(token, "1234568");

//     req.user = verified;

//     next();
//   } catch (err) {
//     console.log("yha s nhi verify ho rha");

//     res.status(400).json({ error: "Invalid Token" });
//   }
// };

// module.exports = authMiddleware;


const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("Auth Middleware Called");

  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, "1234568"); // Replace with process.env.JWT_SECRET in production
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid Token" });
  }
};

module.exports = authMiddleware;
