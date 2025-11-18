import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model";  // <-- FIXED
import { UserRole } from "../types/user";

const router = express.Router();

router.post("/google", async (req, res) => {
  try {
    const { email, name, image, role } = req.body as {
      email: string;
      name: string;
      image: string;
      role: UserRole;
    };

    if (!email || !name || !image || !role)
      console.error("Invalid data is received to the backend");

    const allowedRoles: UserRole[] = ["admin", "applicant", "employee", "client"];
    const sanitizedRole: UserRole = allowedRoles.includes(role) ? role : "employee";

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({
        name,
        email,
        image,          // changed from avatar → image (your schema uses image)
        role: sanitizedRole,
        emailVerified: true,
      });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

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
  } catch (err) {
    console.error("Auth /google error", err);
    res.status(500).json({ error: "Failed to authenticate user" });
  }
});

export default router;
