import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { UserRole } from "../types/user";
import { Client } from "../models/client.model";

const router = express.Router();

/**
 * ------------------------------------------
 * VERIFY USER
 * ------------------------------------------
 */
router.post("/verify", async (req, res) => {
  try {
    const { email, role } = req.body;

    if (!email) return res.status(400).json({ error: "Email required" });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    if (role && user.role !== role)
      return res.status(403).json({ error: "ROLE_MISMATCH" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.error("Verify error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

/**
 * ------------------------------------------
 * CREATE GOOGLE USER
 * ------------------------------------------
 */
router.post("/google", async (req, res) => {
  try {
    const { email, name, image, role } = req.body;

    if (!email || !name || !image || !role)
      return res.status(400).json({ error: "Invalid Google data" });

    const allowedRoles: UserRole[] = [
      "admin",
      "employee",
      "client",
      "applicant",
    ];

    const finalRole: UserRole = allowedRoles.includes(role)
      ? role
      : "employee";

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        image,
        role: finalRole,
        emailVerified: true,
      });
    }

    if(user.role === "client") {
      const client = await Client.create({
        name: user.name,
        userId: user._id
      })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.json({ user, token });
  } catch (error) {
    console.error("Google auth error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
