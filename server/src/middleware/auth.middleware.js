import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  try {
    const jwtSecret = process.env.JWT_SECRET_KEY;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "token missing" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "invalid auth format" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded;
    next(); // ✅ THIS WILL WORK NOW
  } catch (error) {
    console.error("JWT ERROR:", error.message);
    return res.status(401).json({ message: "invalid token" });
  }
}
