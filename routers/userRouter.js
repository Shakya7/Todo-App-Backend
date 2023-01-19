const express=require("express");
const authController=require("../controllers/authController");
const userController=require("../controllers/userController");

const router=express.Router();


router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/getProfileData/:id").get(userController.getProfileData);
router.route("/authenticate").get(authController.checkCookiePresent);
router.route("/updateName/:id").patch(userController.updateName);
router.route("/updateMail/:userid").patch(authController.checkPassword, userController.updateEmail);
router.route("/updateMobile/:userid").patch(authController.checkPassword, userController.updateMobile);
router.route("/updatePassword/:userid").patch(userController.updatePassword);
router.route("/forgotPassword").post(authController.forgotPass);
router.route("/resetPassword/:token").patch(authController.resetPassword);
router.route("/checkResetToken").post(authController.checkResetToken);

router.route("/test").get(userController.test);


module.exports=router;