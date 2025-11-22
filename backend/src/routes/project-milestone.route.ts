// src/routes/project-milestone.routes.ts
import { Router } from "express";
import {
  createProjectMilestone,
  getProjectMilestones,
  getProjectMilestoneById,
  updateProjectMilestone,
  deleteProjectMilestone,
} from "../controllers/project-milestone.controller";

import { validate } from "../middlewares/validate";
import {
  createProjectMilestoneSchema,
  updateProjectMilestoneSchema,
  getProjectMilestoneByIdSchema,
  listProjectMilestonesSchema,
  deleteProjectMilestoneSchema,
} from "../validation/project-milestone.schema";

const router = Router();

router.post("/", validate(createProjectMilestoneSchema), createProjectMilestone);
router.get("/", validate(listProjectMilestonesSchema), getProjectMilestones);
router.get("/:id", validate(getProjectMilestoneByIdSchema), getProjectMilestoneById);
router.put("/:id", validate(updateProjectMilestoneSchema), updateProjectMilestone);
router.delete("/:id", validate(deleteProjectMilestoneSchema), deleteProjectMilestone);

export default router;
