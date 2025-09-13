import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { loginSchema } from "../validations/auth.validations";

const router = Router();

router.post("/login", validate(loginSchema), authController.loginController);

export const authRoutes = router;