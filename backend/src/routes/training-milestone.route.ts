// src/routes/training-milestone.routes.ts
import { Router } from "express";
import {
  createTrainingMilestone,
  getTrainingMilestones,
  getTrainingMilestoneById,
  updateTrainingMilestone,
  deleteTrainingMilestone,
} from "../controllers/training-milestone.controller";

import { validate } from "../middlewares/validate";
import {
  createTrainingMilestoneSchema,
  updateTrainingMilestoneSchema,
  getTrainingMilestoneByIdSchema,
  listTrainingMilestonesSchema,
  deleteTrainingMilestoneSchema,
} from "../validation/training-milestone.schema";

const router = Router();

router.post("/", validate(createTrainingMilestoneSchema), createTrainingMilestone);
router.get("/", validate(listTrainingMilestonesSchema), getTrainingMilestones);
router.get("/:id", validate(getTrainingMilestoneByIdSchema), getTrainingMilestoneById);
router.put("/:id", validate(updateTrainingMilestoneSchema), updateTrainingMilestone);
router.delete("/:id", validate(deleteTrainingMilestoneSchema), deleteTrainingMilestone);

export default router;
