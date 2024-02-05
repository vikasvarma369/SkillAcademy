import AppError from "../utils/error.utils.js";
import jwt from "jsonwebtoken";
import userModel from '../models/user.model.js';

// verify jwt 
const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new AppError("Unauthenticated, please login again", 400))
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;

    next();
}

// authorised roles
const authorisedRoles = (...roles) => async (req, _, next) => {
    const currentUserRole = req.user.role;
    if (!roles.includes(currentUserRole)) {
        return next(new AppError("You not have permission to access this route", 403))
    }
    next();
}

// authorze subscriber 
const authorizeSubscriber = async (req, _, next) => {
    const {role, id} = req.user; 
    console.log("role: and", role,+" ID=>"+id)
    const user = await userModel.findById(id);
    const subscriptionStatus = user.subscription.status;
    if (role !== 'ADMIN' && subscriptionStatus !== 'active') {
        return next(
            new AppError('Only for subscribed users, subscribe first', 403)
        )
    }

    next();
}

export {
    isLoggedIn,
    authorisedRoles,
    authorizeSubscriber
}