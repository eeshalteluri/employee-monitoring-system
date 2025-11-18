// src/routes/update.routes.ts
import { Router } from "express";
import {
  createUpdate,
  getUpdates,
  getUpdateById,
  updateUpdate,
  deleteUpdate,
} from "../controllers/updates.controller";
import { validate } from "../middlewares/validate";
import {
  createUpdateSchema,
  updateUpdateSchema,
  getUpdateByIdSchema,
  listUpdatesSchema,
  deleteUpdateSchema,
} from "../validation/updates.schema";

const router = Router();

router.post("/", validate(createUpdateSchema), createUpdate);
router.get("/", validate(listUpdatesSchema), getUpdates);
router.get("/:id", validate(getUpdateByIdSchema), getUpdateById);
router.put("/:id", validate(updateUpdateSchema), updateUpdate);
router.delete("/:id", validate(deleteUpdateSchema), deleteUpdate);

export default router;
