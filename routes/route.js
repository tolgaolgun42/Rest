const express=require('express');
const registerController=require('../controllers/registerController')
const loginController=require('../controllers/loginController');
const resetPasswordController=require('../controllers/resetPasswordController');

const router=express.Router();

router.post("/register",registerController);
router.post("/login",loginController);
router.post("/resetPassword",resetPasswordController);

module.exports=router;