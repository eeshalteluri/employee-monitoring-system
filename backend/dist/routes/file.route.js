"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/file.routes.ts
const express_1 = require("express");
const file_controller_1 = require("../controllers/file.controller");
const validate_1 = require("../middlewares/validate");
const file_schema_1 = require("../validation/file.schema");
const router = (0, express_1.Router)();
router.post("/", (0, validate_1.validate)(file_schema_1.createFileSchema), file_controller_1.createFile);
router.get("/", (0, validate_1.validate)(file_schema_1.listFilesSchema), file_controller_1.getFiles);
router.get("/:id", (0, validate_1.validate)(file_schema_1.getFileByIdSchema), file_controller_1.getFileById);
router.put("/:id", (0, validate_1.validate)(file_schema_1.updateFileSchema), file_controller_1.updateFile);
router.delete("/:id", (0, validate_1.validate)(file_schema_1.deleteFileSchema), file_controller_1.deleteFile);
exports.default = router;
//# sourceMappingURL=file.route.js.map