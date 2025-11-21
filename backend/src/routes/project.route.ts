// src/routes/project.routes.ts
import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";
import { validate } from "../middlewares/validate";
import {
  createProjectSchema,
  updateProjectSchema,
  getProjectByIdSchema,
  listProjectsSchema,
  deleteProjectSchema,
} from "../validation/project.schema";
import { auth } from "../middlewares/auth";

const router = Router();

router.use(auth);

router.post("/", validate(createProjectSchema), createProject);
router.get("/", validate(listProjectsSchema), getProjects);
router.get("/:id", validate(getProjectByIdSchema), getProjectById);
router.put("/:id", validate(updateProjectSchema), updateProject);
router.delete("/:id", validate(deleteProjectSchema), deleteProject);

export default router;
