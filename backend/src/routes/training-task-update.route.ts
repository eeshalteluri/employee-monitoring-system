// src/routes/training-task-update.routes.ts
import { Router } from "express";
import {
  createTrainingTaskUpdate,
  getTrainingTaskUpdates,
  getTrainingTaskUpdateById,
  updateTrainingTaskUpdate,
  deleteTrainingTaskUpdate,
} from "../controllers/training-task-update.controller";

import { validate } from "../middlewares/validate";
import {
  createTrainingTaskUpdateSchema,
  updateTrainingTaskUpdateSchema,
  getTrainingTaskUpdateByIdSchema,
  listTrainingTaskUpdatesSchema,
  deleteTrainingTaskUpdateSchema,
} from "../validation/training-task-update.schema";

const router = Router();

router.post("/", validate(createTrainingTaskUpdateSchema), createTrainingTaskUpdate);
router.get("/", validate(listTrainingTaskUpdatesSchema), getTrainingTaskUpdates);
router.get("/:id", validate(getTrainingTaskUpdateByIdSchema), getTrainingTaskUpdateById);
router.put("/:id", validate(updateTrainingTaskUpdateSchema), updateTrainingTaskUpdate);
router.delete("/:id", validate(deleteTrainingTaskUpdateSchema), deleteTrainingTaskUpdate);

export default router;
