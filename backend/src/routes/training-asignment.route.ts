// src/routes/training-assignment.routes.ts
import { Router } from "express";
import {
  createTrainingAssignment,
  getTrainingAssignments,
  getTrainingAssignmentById,
  updateTrainingAssignment,
  deleteTrainingAssignment,
} from "../controllers/training-assignment.controller";

import { validate } from "../middlewares/validate";
import {
  createTrainingAssignmentSchema,
  updateTrainingAssignmentSchema,
  getTrainingAssignmentByIdSchema,
  listTrainingAssignmentsSchema,
  deleteTrainingAssignmentSchema,
} from "../validation/training-assignment.schema";

const router = Router();

router.post("/", validate(createTrainingAssignmentSchema), createTrainingAssignment);
router.get("/", validate(listTrainingAssignmentsSchema), getTrainingAssignments);
router.get("/:id", validate(getTrainingAssignmentByIdSchema), getTrainingAssignmentById);
router.put("/:id", validate(updateTrainingAssignmentSchema), updateTrainingAssignment);
router.delete("/:id", validate(deleteTrainingAssignmentSchema), deleteTrainingAssignment);

export default router;
