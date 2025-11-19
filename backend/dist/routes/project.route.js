"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/project.routes.ts
const express_1 = require("express");
const project_controller_1 = require("../controllers/project.controller");
const validate_1 = require("../middlewares/validate");
const project_schema_1 = require("../validation/project.schema");
const router = (0, express_1.Router)();
router.post("/", (0, validate_1.validate)(project_schema_1.createProjectSchema), project_controller_1.createProject);
router.get("/", (0, validate_1.validate)(project_schema_1.listProjectsSchema), project_controller_1.getProjects);
router.get("/:id", (0, validate_1.validate)(project_schema_1.getProjectByIdSchema), project_controller_1.getProjectById);
router.put("/:id", (0, validate_1.validate)(project_schema_1.updateProjectSchema), project_controller_1.updateProject);
router.delete("/:id", (0, validate_1.validate)(project_schema_1.deleteProjectSchema), project_controller_1.deleteProject);
exports.default = router;
//# sourceMappingURL=project.route.js.map