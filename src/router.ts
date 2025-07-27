import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import uploader from "./libs/utilis/uploader";
import productController from "./controllers/product.controller";
import orderController from "./controllers/order.controller";

router.get("/member/restaurant", memberController.getRestaurant);
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post("/member/logout", memberController.verifyAuth, memberController.logout);
router.get("/member/detail",memberController.verifyAuth, memberController.getMemberDetail);
router.post("/member/upload", 
    uploader("members").single("file"), 
    memberController.verifyAuth, 
    memberController.uploadMemberImage
);
router.post("/member/update", 
    uploader("members").single("file"),
    memberController.verifyAuth,
    memberController.updateMember
);

router.get("/member/top-users", memberController.getTopUsers);
router.get("/product/all", productController.getProducts);
router.get("/product/:id",
    memberController.retrieveAuth,
    productController.getProduct
)


router.post("/order/create",
 memberController.verifyAuth,
orderController.createOrder
);

router.get("/order/all",
 memberController.verifyAuth,
 orderController.getMyOrders)

 
export default router;