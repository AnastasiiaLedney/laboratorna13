import {Router} from "express";
import authController from "./controller";
import passport from "passport";

const authRouter = new Router();
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/", passport.authenticate("jwt", {session:false}), authController.check);

export default authRouter;