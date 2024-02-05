import { Router } from "express";

const router = Router();
import { register,
     login,
     logout,
     getCurrentUser,
     forgotPassword, 
     resetPassword, 
     changePassword, 
     updateUser } from '../controller/user.controller.js';
import { isLoggedIn } from "../middleware/auth.middleware.js";
import upload from '../middleware/multer.middleware.js'

// secure route
router.route('/register').post( upload.single("avatar"), register);
router.route('/login').post(login);
router.route('/logout').post(isLoggedIn, logout);
router.route('/me').get( isLoggedIn, getCurrentUser);
router.route('/reset').post(forgotPassword);
router.route('/change-password').post( isLoggedIn, changePassword);
// params 
router.route('/reset/:resetToken').post(resetPassword);
router.route('/update-user-details/:id').post( isLoggedIn, upload.single("avatar"), updateUser);

export default router;