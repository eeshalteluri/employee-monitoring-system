// src/routes/training-task-assignment.routes.ts
import { Router } from "express";
import {
  createTrainingTaskAssignment,
  getTrainingTaskAssignments,
  getTrainingTaskAssignmentById,
  updateTrainingTaskAssignment,
  deleteTrainingTaskAssignment,
} from "../controllers/training-task-assignment.controller";

import { validate } from "../middlewares/validate";
import {
  createTrainingTaskAssignmentSchema,
  updateTrainingTaskAssignmentSchema,
  getTrainingTaskAssignmentByIdSchema,
  listTrainingTaskAssignmentsSchema,
  deleteTrainingTaskAssignmentSchema,
} from "../validation/training-task-assignment.schema";

const router = Router();

router.post("/", validate(createTrainingTaskAssignmentSchema), createTrainingTaskAssignment);
router.get("/", validate(listTrainingTaskAssignmentsSchema), getTrainingTaskAssignments);
router.get("/:id", validate(getTrainingTaskAssignmentByIdSchema), getTrainingTaskAssignmentById);
router.put("/:id", validate(updateTrainingTaskAssignmentSchema), updateTrainingTaskAssignment);
router.delete("/:id", validate(deleteTrainingTaskAssignmentSchema), deleteTrainingTaskAssignment);

export default router;
