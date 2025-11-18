"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/update.routes.ts
const express_1 = require("express");
const updates_controller_1 = require("../controllers/updates.controller");
const validate_1 = require("../middlewares/validate");
const updates_schema_1 = require("../validation/updates.schema");
const router = (0, express_1.Router)();
router.post("/", (0, validate_1.validate)(updates_schema_1.createUpdateSchema), updates_controller_1.createUpdate);
router.get("/", (0, validate_1.validate)(updates_schema_1.listUpdatesSchema), updates_controller_1.getUpdates);
router.get("/:id", (0, validate_1.validate)(updates_schema_1.getUpdateByIdSchema), updates_controller_1.getUpdateById);
router.put("/:id", (0, validate_1.validate)(updates_schema_1.updateUpdateSchema), updates_controller_1.updateUpdate);
router.delete("/:id", (0, validate_1.validate)(updates_schema_1.deleteUpdateSchema), updates_controller_1.deleteUpdate);
exports.default = router;
//# sourceMappingURL=updates.route.js.map