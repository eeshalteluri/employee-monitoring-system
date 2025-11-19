"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/user.routes.ts
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validate_1 = require("../middlewares/validate");
const user_schema_1 = require("../validation/user.schema");
const router = (0, express_1.Router)();
router.post("/", (0, validate_1.validate)(user_schema_1.createUserSchema), user_controller_1.createUser);
router.get("/", (0, validate_1.validate)(user_schema_1.listUsersSchema), user_controller_1.getUsers);
router.get("/:id", (0, validate_1.validate)(user_schema_1.getUserByIdSchema), user_controller_1.getUserById);
router.put("/:id", (0, validate_1.validate)(user_schema_1.updateUserSchema), user_controller_1.updateUser);
router.delete("/:id", (0, validate_1.validate)(user_schema_1.deleteUserSchema), user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.route.js.map