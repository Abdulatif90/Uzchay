import express from "express";
const routerAdmin = express.Router();
import restaurauntController from "./controllers/restauraunt.controller";

/** Restaurant */
routerAdmin.get("/", restaurauntController.goHome);
routerAdmin
  .get("/login", restaurauntController.getLogin)
  .post("/login", restaurauntController.processLogin);
routerAdmin
  .get("/signup", restaurauntController.getSignup)
  .post("/signup", restaurauntController.processSignup);

/** Product */

/** User */

export default routerAdmin;