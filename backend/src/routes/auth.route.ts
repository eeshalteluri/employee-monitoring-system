import express from "express";
import jwt from "jsonwebtoken";
import User, { Role } from "../models/user.model";


const router = express.Router();

/**
 * Called by NextAuth *after* Google login succeeds.
 * Frontend sends: email, name, picture, role
 */
router.post("/google", async (req, res) => {
  try {
    const { email, name, image, role } = req.body as {
      email: string;
      name: string;
      image: string;
      role: Role;
    };

    if(!email || !name || !image || !role) console.error("Invalid data is received to the backend");

    // Basic validation so user can't invent random role strings
    const allowedRoles: Role[] = ["admin", "applicant", "employee", "client"];
    const sanitizedRole: Role = allowedRoles.includes(role) ? role : "employee";

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: image,
        provider: "google",
        role: sanitizedRole,
      });
    } else {
      // Optionally: only allow role *upgrade* under certain conditions
      // For now we DO NOT change existing role from frontend to avoid privilege escalation
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
        avatar: user.image,
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
