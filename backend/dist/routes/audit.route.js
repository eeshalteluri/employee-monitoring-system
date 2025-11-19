"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/audit.routes.ts
const express_1 = require("express");
const audit_controller_1 = require("../controllers/audit.controller");
const validate_1 = require("../middlewares/validate");
const audit_schema_1 = require("../validation/audit.schema");
const router = (0, express_1.Router)();
router.post("/", (0, validate_1.validate)(audit_schema_1.createAuditSchema), audit_controller_1.createAudit);
router.get("/", (0, validate_1.validate)(audit_schema_1.listAuditsSchema), audit_controller_1.getAudits);
router.get("/:id", (0, validate_1.validate)(audit_schema_1.getAuditByIdSchema), audit_controller_1.getAuditById);
router.put("/:id", (0, validate_1.validate)(audit_schema_1.updateAuditSchema), audit_controller_1.updateAudit);
router.delete("/:id", (0, validate_1.validate)(audit_schema_1.deleteAuditSchema), audit_controller_1.deleteAudit);
exports.default = router;
//# sourceMappingURL=audit.route.js.map