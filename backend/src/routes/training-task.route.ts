// src/routes/training-task.routes.ts
import { Router } from "express";
import {
  createTrainingTask,
  getTrainingTasks,
  getTrainingTaskById,
  updateTrainingTask,
  deleteTrainingTask,
} from "../controllers/training-task.controller";

import { validate } from "../middlewares/validate";
import {
  createTrainingTaskSchema,
  updateTrainingTaskSchema,
  getTrainingTaskByIdSchema,
  listTrainingTasksSchema,
  deleteTrainingTaskSchema,
} from "../validation/training-task.schema";

const router = Router();

router.post("/", validate(createTrainingTaskSchema), createTrainingTask);
router.get("/", validate(listTrainingTasksSchema), getTrainingTasks);
router.get("/:id", validate(getTrainingTaskByIdSchema), getTrainingTaskById);
router.put("/:id", validate(updateTrainingTaskSchema), updateTrainingTask);
router.delete("/:id", validate(deleteTrainingTaskSchema), deleteTrainingTask);

export default router;
