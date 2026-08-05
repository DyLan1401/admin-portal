import { Router } from "express";
import * as UserController from "../controller/userController.js"

const route = Router();

route.get("/users", UserController.getUsers);

export default route;