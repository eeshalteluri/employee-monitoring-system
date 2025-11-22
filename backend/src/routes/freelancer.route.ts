// src/routes/freelancer.routes.ts
import { Router } from "express";
import {
  createFreelancer,
  getFreelancers,
  getFreelancerById,
  updateFreelancer,
  deleteFreelancer,
} from "../controllers/freelancer.controller";

import { validate } from "../middlewares/validate";
import {
  createFreelancerSchema,
  updateFreelancerSchema,
  getFreelancerByIdSchema,
  listFreelancersSchema,
  deleteFreelancerSchema,
} from "../validation/freelancer.schema";

const router = Router();

router.post("/", validate(createFreelancerSchema), createFreelancer);
router.get("/", validate(listFreelancersSchema), getFreelancers);
router.get("/:id", validate(getFreelancerByIdSchema), getFreelancerById);
router.put("/:id", validate(updateFreelancerSchema), updateFreelancer);
router.delete("/:id", validate(deleteFreelancerSchema), deleteFreelancer);

export default router;
