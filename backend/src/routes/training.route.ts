// src/routes/training.routes.ts
import { Router } from "express";
import {
  createTraining,
  getTrainings,
  getTrainingById,
  updateTraining,
  deleteTraining,
} from "../controllers/training.controller";

import { validate } from "../middlewares/validate";
import {
  createTrainingSchema,
  updateTrainingSchema,
  getTrainingByIdSchema,
  listTrainingsSchema,
  deleteTrainingSchema,
} from "../validation/training.schema";

const router = Router();

router.post("/", validate(createTrainingSchema), createTraining);
router.get("/", validate(listTrainingsSchema), getTrainings);
router.get("/:id", validate(getTrainingByIdSchema), getTrainingById);
router.put("/:id", validate(updateTrainingSchema), updateTraining);
router.delete("/:id", validate(deleteTrainingSchema), deleteTraining);

export default router;
