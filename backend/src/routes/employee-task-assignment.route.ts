// src/routes/employee-task-assignment.routes.ts
import { Router } from "express";
import {
  createEmployeeTaskAssignment,
  getEmployeeTaskAssignments,
  getEmployeeTaskAssignmentById,
  updateEmployeeTaskAssignment,
  deleteEmployeeTaskAssignment,
} from "../controllers/employee-task-assignment.controller";

import { validate } from "../middlewares/validate";
import {
  createEmployeeTaskAssignmentSchema,
  updateEmployeeTaskAssignmentSchema,
  getEmployeeTaskAssignmentByIdSchema,
  listEmployeeTaskAssignmentsSchema,
  deleteEmployeeTaskAssignmentSchema,
} from "../validation/employee-task-assignment.chema";

const router = Router();

router.post("/", validate(createEmployeeTaskAssignmentSchema), createEmployeeTaskAssignment);
router.get("/", validate(listEmployeeTaskAssignmentsSchema), getEmployeeTaskAssignments);
router.get("/:id", validate(getEmployeeTaskAssignmentByIdSchema), getEmployeeTaskAssignmentById);
router.put("/:id", validate(updateEmployeeTaskAssignmentSchema), updateEmployeeTaskAssignment);
router.delete("/:id", validate(deleteEmployeeTaskAssignmentSchema), deleteEmployeeTaskAssignment);

export default router;
