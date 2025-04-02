import { Router } from "express";
import { index, show, store, update, destroy, profile, restore } from "./Controller.js";

export const usersRouter = Router();

usersRouter.get("/", index);
usersRouter.get("/:id", show);
usersRouter.post("/", store);
usersRouter.put("/:id", update);
usersRouter.delete("/:id", destroy); 
usersRouter.patch("/:id/restore", restore);
usersRouter.get("/profile", profile); 
