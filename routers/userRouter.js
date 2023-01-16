const express=require("express");
const authController=require("../controllers/authController");
const userController=require("../controllers/userController");

const router=express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/getProfileData/:id").get(userController.getProfileData);
router.route("/authenticate").get(authController.checkCookiePresent);


module.exports=router;