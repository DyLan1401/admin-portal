import { Router } from "express";
import * as AuthController from "../controller/authController.js"
import { authenticate } from "../middleware/authenticate.js";
import { loginRateLimiter } from "../middleware/loginRateLimiter.js";

const route = Router();

route.post("/login", loginRateLimiter, AuthController.login)
route.get("/me", authenticate, AuthController.me)
route.post("/logout", AuthController.logout);
export default route;