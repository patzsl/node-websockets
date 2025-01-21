import { Router } from "express";
import {
  GetUser,
  Login,
  Register,
  UpdateUser,
} from "./controllers/auth.controller";
import { AuthMiddleware } from "./middlewares/auth.middleware";

export const routes = (router: Router) => {
  router.post("/api/register", Register);
  router.post("/api/login", Login);
  router.get("/api/user", AuthMiddleware, GetUser);
  router.put("/api/user", AuthMiddleware, UpdateUser);
};
