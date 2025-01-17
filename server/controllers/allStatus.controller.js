import AppError from '../utils/error.utils.js';
import userModel from '../models/user.model.js';



// all status for admin
const Allstatus = async (req, res, next) => {
    try {
        const allUsers = await userModel.find({});
        const allUsersCount = allUsers.length;
        const subscribedUsersCount = allUsers.filter((user) => user.subscription.status === 'active').length;
 
        res.status(200).json({
            success: true,
            message: 'stats',
            allUsersCount,
            subscribedUsersCount
        })
    } catch (e) {
        console.log("While fetching data for admin Error: ", e)
        return next(new AppError(e.message, 500));
    }
}

export {
    Allstatus
}