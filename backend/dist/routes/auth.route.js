"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const router = express_1.default.Router();
router.post("/google", async (req, res) => {
    try {
        const { email, name, image, role } = req.body;
        if (!email || !name || !image || !role)
            console.error("Invalid data is received to the backend");
        const allowedRoles = ["admin", "applicant", "employee", "client"];
        const sanitizedRole = allowedRoles.includes(role) ? role : "employee";
        let user = await user_model_1.User.findOne({ email });
        if (!user) {
            user = await user_model_1.User.create({
                name,
                email,
                image, // changed from avatar → image (your schema uses image)
                role: sanitizedRole,
                emailVerified: true,
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id.toString(), email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                role: user.role,
            },
            token,
        });
    }
    catch (err) {
        console.error("Auth /google error", err);
        res.status(500).json({ error: "Failed to authenticate user" });
    }
});
exports.default = router;
//# sourceMappingURL=auth.route.js.map