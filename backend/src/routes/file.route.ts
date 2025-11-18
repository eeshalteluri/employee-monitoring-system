// src/routes/file.routes.ts
import { Router } from "express";
import {
  createFile,
  getFiles,
  getFileById,
  updateFile,
  deleteFile,
} from "../controllers/file.controller";
import { validate } from "../middlewares/validate";
import {
  createFileSchema,
  updateFileSchema,
  getFileByIdSchema,
  listFilesSchema,
  deleteFileSchema,
} from "../validation/file.schema";

const router = Router();

router.post("/", validate(createFileSchema), createFile);
router.get("/", validate(listFilesSchema), getFiles);
router.get("/:id", validate(getFileByIdSchema), getFileById);
router.put("/:id", validate(updateFileSchema), updateFile);
router.delete("/:id", validate(deleteFileSchema), deleteFile);

export default router;
