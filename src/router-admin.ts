import express from "express";
const routerAdmin = express.Router();
import restaurauntController from "./controllers/restauraunt.controller";
import productController from "./controllers/product.controller";
import makeUpLoader  from "./libs/utilis/uploader";

/** Restaurant */
routerAdmin.get("/", restaurauntController.goHome);
routerAdmin
  .get("/login", restaurauntController.getLogin)
  .post("/login", restaurauntController.processLogin);
routerAdmin
  .get("/signup", restaurauntController.getSignup)
  .post("/signup", 
    makeUpLoader('members').single('memberImage'),
    restaurauntController.processSignup);
routerAdmin
  .get("/checkme", restaurauntController.checkAuthSession)
  .get("/logout", restaurauntController.logout);

/** Product */
routerAdmin
  .get("/product/all",
     restaurauntController.veryfyRestaurant,
     productController.getAllProducts)

  .post("/product/create", 
    restaurauntController.veryfyRestaurant,
    makeUpLoader('products').array('productImages',5),
    productController.createProduct)


  .post("/product/:id",
    restaurauntController.veryfyRestaurant,
    productController.updateProduct)

     /** User */

  routerAdmin
  .get('/user/all',
    restaurauntController.veryfyRestaurant,
    restaurauntController.getUsers
  )

  .post('/user/edit',
    restaurauntController.veryfyRestaurant,
    makeUpLoader('members').single('memberImage'),
    restaurauntController.updateChosenUser
  )

export default routerAdmin;