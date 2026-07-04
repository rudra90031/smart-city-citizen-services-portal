const express=require("express");

const router=express.Router();

const {

registerAdmin,
loginAdmin,
getProfile,
updateProfile,
changePassword

}=require("../controllers/adminAuthController");

const adminAuth=require("../middleware/adminAuth");

router.post(
    "/register",
    registerAdmin
);

router.post(
"/login",
loginAdmin
);

router.get(
"/profile",
adminAuth,
getProfile
);

router.put(
"/profile",
adminAuth,
updateProfile
);

router.put(
"/change-password",
adminAuth,
changePassword
);

module.exports=router;