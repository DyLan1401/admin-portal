import { Router } from "express";
import * as UserController from "../controller/userController.js"
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
const route = Router();

route.get("/users", authenticate, authorize("ADMIN"), UserController.getUsers);

route.get("/users/:id", authenticate, authorize("ADMIN"), UserController.getUserDetail);
route.patch("/users/:id/status", authenticate, authorize("ADMIN"), UserController.updateStatusUser)
export default route;