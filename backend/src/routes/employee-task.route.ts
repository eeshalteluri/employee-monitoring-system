// src/routes/employee-task.routes.ts
import { Router } from "express";
import {
  createEmployeeTask,
  getEmployeeTasks,
  getEmployeeTaskById,
  updateEmployeeTask,
  deleteEmployeeTask,
} from "../controllers/employee-task.controller";

import { validate } from "../middlewares/validate";
import {
  createEmployeeTaskSchema,
  updateEmployeeTaskSchema,
  getEmployeeTaskByIdSchema,
  listEmployeeTasksSchema,
  deleteEmployeeTaskSchema,
} from "../validation/employee-task.schema";

const router = Router();

router.post("/", validate(createEmployeeTaskSchema), createEmployeeTask);
router.get("/", validate(listEmployeeTasksSchema), getEmployeeTasks);
router.get("/:id", validate(getEmployeeTaskByIdSchema), getEmployeeTaskById);
router.put("/:id", validate(updateEmployeeTaskSchema), updateEmployeeTask);
router.delete("/:id", validate(deleteEmployeeTaskSchema), deleteEmployeeTask);

export default router;
