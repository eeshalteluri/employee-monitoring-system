// src/routes/project-assignment.routes.ts
import { Router } from "express";
import {
  createProjectAssignment,
  getProjectAssignments,
  getProjectAssignmentById,
  updateProjectAssignment,
  deleteProjectAssignment,
} from "../controllers/project-assignment.controller";

import { validate } from "../middlewares/validate";
import {
  createProjectAssignmentSchema,
  updateProjectAssignmentSchema,
  getProjectAssignmentByIdSchema,
  listProjectAssignmentsSchema,
  deleteProjectAssignmentSchema,
} from "../validation/project-assignment.schema";

const router = Router();

router.post("/", validate(createProjectAssignmentSchema), createProjectAssignment);
router.get("/", validate(listProjectAssignmentsSchema), getProjectAssignments);
router.get("/:id", validate(getProjectAssignmentByIdSchema), getProjectAssignmentById);
router.put("/:id", validate(updateProjectAssignmentSchema), updateProjectAssignment);
router.delete("/:id", validate(deleteProjectAssignmentSchema), deleteProjectAssignment);

export default router;
