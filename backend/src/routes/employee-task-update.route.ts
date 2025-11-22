// src/routes/employee-task-update.routes.ts
import { Router } from "express";
import {
  createEmployeeTaskUpdate,
  getEmployeeTaskUpdates,
  getEmployeeTaskUpdateById,
  updateEmployeeTaskUpdate,
  deleteEmployeeTaskUpdate,
} from "../controllers/employee-task-update.controller";

import { validate } from "../middlewares/validate";
import {
  createEmployeeTaskUpdateSchema,
  updateEmployeeTaskUpdateSchema,
  getEmployeeTaskUpdateByIdSchema,
  listEmployeeTaskUpdatesSchema,
  deleteEmployeeTaskUpdateSchema,
} from "../validation/employee-task-update.schema";

const router = Router();

router.post("/", validate(createEmployeeTaskUpdateSchema), createEmployeeTaskUpdate);
router.get("/", validate(listEmployeeTaskUpdatesSchema), getEmployeeTaskUpdates);
router.get("/:id", validate(getEmployeeTaskUpdateByIdSchema), getEmployeeTaskUpdateById);
router.put("/:id", validate(updateEmployeeTaskUpdateSchema), updateEmployeeTaskUpdate);
router.delete("/:id", validate(deleteEmployeeTaskUpdateSchema), deleteEmployeeTaskUpdate);

export default router;
