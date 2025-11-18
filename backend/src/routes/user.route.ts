// src/routes/user.routes.ts
import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { validate } from "../middleware/validate";
import {
  createUserSchema,
  updateUserSchema,
  getUserByIdSchema,
  listUsersSchema,
  deleteUserSchema,
} from "../validation/user.schema";

const router = Router();

router.post("/", validate(createUserSchema), createUser);
router.get("/", validate(listUsersSchema), getUsers);
router.get("/:id", validate(getUserByIdSchema), getUserById);
router.put("/:id", validate(updateUserSchema), updateUser);
router.delete("/:id", validate(deleteUserSchema), deleteUser);

export default router;
