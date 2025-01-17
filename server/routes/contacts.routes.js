import { Router } from "express";
const router = Router();

// import route
import { contactUs } from '../controllers/contacts.controller.js';

// declaration
router.post("/contact", contactUs);


export default router;