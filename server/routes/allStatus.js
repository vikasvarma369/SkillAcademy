import { Router } from "express";
const router = Router();
import { Allstatus } from '../controllers/allStatus.controller.js'
// import route
import {isLoggedIn, authorisedRoles} from '../middleware/auth.middleware.js'

// declaration
router.get("/allstatus/users", isLoggedIn, authorisedRoles("ADMIN"), Allstatus);


export default router;