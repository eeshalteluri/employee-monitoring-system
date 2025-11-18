"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/client.routes.ts
const express_1 = require("express");
const client_controller_1 = require("../controllers/client.controller");
const validate_1 = require("../middlewares/validate");
const client_schema_1 = require("../validation/client.schema");
const router = (0, express_1.Router)();
router.post("/", (0, validate_1.validate)(client_schema_1.createClientSchema), client_controller_1.createClient);
router.get("/", (0, validate_1.validate)(client_schema_1.listClientsSchema), client_controller_1.getClients);
router.get("/:id", (0, validate_1.validate)(client_schema_1.getClientByIdSchema), client_controller_1.getClientById);
router.put("/:id", (0, validate_1.validate)(client_schema_1.updateClientSchema), client_controller_1.updateClient);
router.delete("/:id", (0, validate_1.validate)(client_schema_1.deleteClientSchema), client_controller_1.deleteClient);
exports.default = router;
//# sourceMappingURL=client.route.js.map