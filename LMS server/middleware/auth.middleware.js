import AppError from "../utils/error.utils.js";
import jwt from "jsonwebtoken";


const isLoggedIn = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new AppError("Unauthenticated, please login again", 400))
    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;

    next();
}


export {
    isLoggedIn,
}