import { Router } from "express";
const router = Router();

// import route
import {isLoggedIn, authorisedRoles} from '../middleware/auth.middleware.js'

// declaration
router.get("/admin/allstatus/users", isLoggedIn, authorisedRoles("ADMIN"), Allstatus);


export default router;