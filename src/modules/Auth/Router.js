import { Router } from "express";
import { changePassword, login, register, logout } from "./Controller.js";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.put("/change-password", changePassword);
authRouter.post("/register", register);
authRouter.get("/logout", logout);

