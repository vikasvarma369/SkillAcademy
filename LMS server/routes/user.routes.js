import { Router } from "express";

const router = Router();
import { register,
         login, 
         logout, 
         getProfile, 
         forgotPassword, 
         resetPassword, 
         changePassword, 
         updateUser, 
         continueWithGoogle } from '../controllers/user.controller.js';
import { isLoggedIn } from "../middleware/auth.middleware.js";
import upload from '../middleware/multer.middleware.js'

router.post('/register', upload.single("avatar"), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isLoggedIn, getProfile);
router.post('/reset', forgotPassword);
router.post('/reset/:resetToken', resetPassword);
router.put('/change-password', isLoggedIn, changePassword);
router.put('/update/:id', isLoggedIn, upload.single("avatar"), updateUser);
router.post('/google', continueWithGoogle)

export default router;