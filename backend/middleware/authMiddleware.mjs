import jwt from "jsonwebtoken";
import User from "../models/userModel.mjs";

async function protect(req, res, next) {
  let token;

  // check if jwt token is passed in HEADERS is a "Bearer" token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // translate the token into the correct User
      req.user = await User.findById(decoded.id).select("-password");

      // proceed to route controller call
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized user");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("not authorized, no token");
  }
}

export default protect;