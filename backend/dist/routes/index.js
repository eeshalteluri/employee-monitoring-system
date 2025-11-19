"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const client_route_1 = __importDefault(require("./client.route"));
const project_route_1 = __importDefault(require("./project.route"));
const updates_route_1 = __importDefault(require("./updates.route"));
const file_route_1 = __importDefault(require("./file.route"));
const audit_route_1 = __importDefault(require("./audit.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const router = (0, express_1.Router)();
router.use("/auth", auth_route_1.default);
router.use("/users", user_route_1.default);
router.use("/clients", client_route_1.default);
router.use("/projects", project_route_1.default);
router.use("/updates", updates_route_1.default);
router.use("/files", file_route_1.default);
router.use("/audits", audit_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map