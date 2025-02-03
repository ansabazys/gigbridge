import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;
  let decoded;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1]; // Extract token
      console.log("Token received:", token); // Log the token for debugging

      // Verify token
      decoded = jwt.verify(token, process.env.JWT_SECRET); 
      console.log("Decoded payload:", decoded); // Log decoded payload

      req.user = decoded; // Attach decoded user to request
      next(); // Proceed to next middleware/controller
    } catch (error) {
      console.error("Token verification failed:", error.message); // Log the error message
      res.status(401).json({ message: "Not authorized, token failed" }); // Return a clear error response
    }
  }

  if (!token) {
    console.error("No token found in authorization header");
    res.status(401).json({ message: "Not authorized, no token" }); // Clear error message for no token
  }
};

export default protect;
