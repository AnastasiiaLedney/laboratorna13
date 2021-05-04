import {Router} from "express";
import passport from "passport";
import groupControler from "./controllerMogoose";



const groupRouter = new Router();
groupRouter.get("/", groupControler.get);
groupRouter.get("/:id", groupControler.getById);
groupRouter.post("/",  passport.authenticate("jwt", {session:false}), groupControler.post);
groupRouter.delete("/:id", passport.authenticate("jwt", {session:false}),  groupControler.delete);
groupRouter.patch("/:id",  passport.authenticate("jwt", {session:false}), groupControler.patch);
groupRouter.put("/", passport.authenticate("jwt", {session:false}), groupControler.put);


export default groupRouter;





