// src/routes/audit.routes.ts
import { Router } from "express";
import {
  createAudit,
  getAudits,
  getAuditById,
  updateAudit,
  deleteAudit,
} from "../controllers/audit.controller";
import { validate } from "../middlewares/validate";
import {
  createAuditSchema,
  updateAuditSchema,
  getAuditByIdSchema,
  listAuditsSchema,
  deleteAuditSchema,
} from "../validation/audit.schema";

const router = Router();

router.post("/", validate(createAuditSchema), createAudit);
router.get("/", validate(listAuditsSchema), getAudits);
router.get("/:id", validate(getAuditByIdSchema), getAuditById);
router.put("/:id", validate(updateAuditSchema), updateAudit);
router.delete("/:id", validate(deleteAuditSchema), deleteAudit);

export default router;
