import jwt from 'jsonwebtoken';
import Users from '../models/user.mjs';
import jwtSecret from '../config/jwt.mjs';

async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
console.log("👉 Raw Authorization:", req.headers.authorization);
console.log("👉 Extracted token:", token);
req.tokenToRemove = token;

    if (!token) {
        res.status(401).send({ message: "No access!" })
        return
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)

     console.log("🔑 Incoming token:", token);
console.log("👤 Decoded:", decoded);
console.log("🔎 DB search...");
const tokenExists = await Users.findOne({ tokens: token });
console.log("✅ tokenExists:", tokenExists)

        if (!tokenExists) {
            res.status(401).send({ message: "Invalid token!" })
            return
        }

        req.userId = decoded._id
        req.tokenToRemove = token
        next()
    } catch (e) {
        res.status(401).send({ message: "Invalid token!" })
    }
}

export default verifyToken;