import express from "express";
const routerAdmin = express.Router();
import restaurauntController from "./controllers/restauraunt.controller";
import productController from "./controllers/product.controller";

/** Restaurant */
routerAdmin.get("/", restaurauntController.goHome);
routerAdmin
  .get("/login", restaurauntController.getLogin)
  .post("/login", restaurauntController.processLogin);
routerAdmin
  .get("/signup", restaurauntController.getSignup)
  .post("/signup", restaurauntController.processSignup);
routerAdmin
  .get("/checkme", restaurauntController.checkAuthSession)
  .get("/logout", restaurauntController.logout);

/** Product */
routerAdmin
  .get("/product/all", restaurauntController.veryfyRestaurant,productController.getAllProducts)
  .post("/product/:id", productController.updateProduct)
  .post("/product/create", productController.createProduct)
/** User */

export default routerAdmin;