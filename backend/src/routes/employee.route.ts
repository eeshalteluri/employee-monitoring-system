// src/routes/employee.routes.ts
import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller";

import { validate } from "../middlewares/validate";
import {
  createEmployeeSchema,
  updateEmployeeSchema,
  getEmployeeByIdSchema,
  listEmployeesSchema,
  deleteEmployeeSchema,
} from "../validation/employee.schema";

const router = Router();

router.post("/", validate(createEmployeeSchema), createEmployee);
router.get("/", validate(listEmployeesSchema), getEmployees);
router.get("/:id", validate(getEmployeeByIdSchema), getEmployeeById);
router.put("/:id", validate(updateEmployeeSchema), updateEmployee);
router.delete("/:id", validate(deleteEmployeeSchema), deleteEmployee);

export default router;
