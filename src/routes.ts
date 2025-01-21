import { Router } from "express";
import { Message } from "./controllers/message.controller";
import { GetUser, Login, Register } from "./controllers/auth.controller";
import { AuthMiddleware } from "./middlewares/auth.middleware";

export const routes = (router: Router) => {
  router.post("/api/message", Message);
  router.post("/api/register", async (req, res) => {
    try {
      await Register(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao registrar usuário");
    }
  });
  router.post("/api/login", async (req, res) => {
    try {
      await Login(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao fazer login");
    }
  });
  router.get("/api/user", async (req, res, next) => {
    try {
      await AuthMiddleware(req, res, next);
      await GetUser(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao buscar usuário");
    }
  });
};
