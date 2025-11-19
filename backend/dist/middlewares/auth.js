"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ error: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "Unauthorized" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(403).json({ error: "Invalid token" });
    }
};
exports.auth = auth;
const requireRole = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user)
            return res.status(401).json({ error: "Unauthorized" });
        if (!roles.includes(user.role)) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=auth.js.map