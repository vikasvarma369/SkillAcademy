import { Router } from "express";
import { getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById,
    deleteCourseLecture, 
    updateCourseLecture } from '../controllers/course.controller.js'
import { 
        isLoggedIn, 
        authorisedRoles, 
        authorizeSubscriber
    } from "../middleware/auth.middleware.js";

import upload from "../middleware/multer.middleware.js"; 


const router = Router();

router.route('/')
    .get(getAllCourses) // only admin can create a coursse  and delete a course  and update a course
    .post(isLoggedIn, authorisedRoles('ADMIN'), upload.single("thumbnail"), createCourse) 
    .delete(isLoggedIn, authorisedRoles('ADMIN'), deleteCourseLecture) 
    .put(isLoggedIn, authorisedRoles('ADMIN'), upload.single("lecture"), updateCourseLecture) 

    // only subcribe user access the course and 
    // only admin can update remove and add lecture in the course
router.route('/:id')
    .get(isLoggedIn, authorizeSubscriber, getLecturesByCourseId) 
    .put(isLoggedIn, authorisedRoles("ADMIN"), upload.single("thumbnail"), updateCourse)
    .delete(isLoggedIn, authorisedRoles('ADMIN'), removeCourse)
    .post(isLoggedIn, authorisedRoles("ADMIN"), upload.single("lecture"), addLectureToCourseById);

export default router