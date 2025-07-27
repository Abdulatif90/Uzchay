import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import uploader from "./libs/utilis/uploader";
import productController from "./controllers/product.controller";

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
router.get("/product", productController.getAllProducts);
router.post("/product/create", 
    uploader("products").single("file"),
    memberController.verifyAuth,
    productController.createProduct
);
router.post("/product/update", 
    uploader("products").single("file"),
    memberController.verifyAuth,
    productController.updateProduct
);
router.post("/product/delete",
    memberController.verifyAuth,
    productController.deleteProduct
);  



router.get("/member/verify-auth", memberController.verifyAuth, (req, res) => {
    res.status(200).json({ message: "Authenticated" });
});
router.get("/member/verify-admin", memberController.verifyAdmin, (req, res) => {
    res.status(200).json({ message: "Admin Access Granted" });
});
router.get("/member/verify-user", memberController.verifyUser, (req, res) => {
    res.status(200).json({ message: "User Access Granted" });
});


export default router;