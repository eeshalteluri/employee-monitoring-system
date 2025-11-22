// src/routes/client.routes.ts
import { Router } from "express";
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} from "../controllers/client.controller";

import { validate } from "../middlewares/validate";
import {
  createClientSchema,
  updateClientSchema,
  getClientByIdSchema,
  listClientsSchema,
  deleteClientSchema,
} from "../validation/client.schema";

const router = Router();

router.post("/", validate(createClientSchema), createClient);
router.get("/", validate(listClientsSchema), getClients);
router.get("/:id", validate(getClientByIdSchema), getClientById);
router.put("/:id", validate(updateClientSchema), updateClient);
router.delete("/:id", validate(deleteClientSchema), deleteClient);

export default router;
