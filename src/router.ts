import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import uploader from "./libs/utilis/uploader";


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

export default router;