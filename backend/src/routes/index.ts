// src/routes/index.ts
import { Router } from "express";
import userRoutes from "./user.route";
import clientRoutes from "./client.route";
import projectRoutes from "./project.route";
import fileRoutes from "./file.route";
import auditRoutes from "./audit.route";
import authRoutes from "./auth.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/clients", clientRoutes);
router.use("/projects", projectRoutes);
router.use("/files", fileRoutes);
router.use("/audits", auditRoutes);

export default router;
