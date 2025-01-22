import jwt from "jsonwebtoken";
import config from "../config/index.js";
/**
 * @description Middleware to verify if the token is valid
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next function
 * @returns {object} - Status code and message
 */

export function authenticateToken(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.auth = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
}

export default authenticateToken;
