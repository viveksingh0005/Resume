const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
    try {
        // ✅ Read token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Token not provided."
            });
        }

        const token = authHeader.split(" ")[1];

        // ✅ Check if token is blacklisted (logged out)
        const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

        if (isTokenBlacklisted) {
            return res.status(401).json({
                message: "Token is invalid. Please login again."
            });
        }

        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Attach user to request
        req.user = decoded;

        next();

    } catch (err) {
        // ✅ Handle specific JWT errors
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired. Please login again."
            });
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token. Please login again."
            });
        }
        return res.status(401).json({
            message: "Authentication failed."
        });
    }
}

module.exports = { authUser };

