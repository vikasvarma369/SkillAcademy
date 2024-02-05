import userModel from "../models/user.model.js";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import fs from 'fs';
import cloudinary from 'cloudinary';
import AppError from "../utils/error.utils.js";
import sendEmail from "../utils/sendEmail.js";

const cookieOptions = {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    secure: true, 
    sameSite: 'none'
}


// Register  user
const register = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        // Check if user misses any fields
        if (!fullName || !email || !password) {
            return next(new AppError("All fields are required", 400));
        }

        // Check if the user already exists
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return next(new AppError("Email already exists, please login", 400));
        }

        // Save user in the database and log the user in
        const user = await userModel.create({
            fullName,
            email,
            password,
            avatar: {
                public_id: email,
                secure_url: "",
            },
        });

        if (!user) {
            return next(new AppError("User registration failed, please try again", 400));
        }

        // File upload
        if (req.file) {
            try {
                const avatar = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: "Learning-Management-System",
                    width: 250,
                    height: 250,
                    gravity: "faces",
                    crop: "fill",
                });

                if (avatar) {
                    user.avatar.public_id = avatar.public_id;
                    user.avatar.secure_url = avatar.secure_url;

                    // Remove the file from the server
                    fs.rmSync(`uploads/${req.file.filename}`);
                }
            } catch (error) {
                return next(new AppError(error.message || "File not uploaded, please try again", 500));
            }
        }

        await user.save();

        user.password = undefined;

        const token = await user.generateJWTToken();

        res.cookie("token", token, cookieOptions);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};



// login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // check if user miss any field
        if (!email || !password) {
            return next(new AppError('All fields are required', 400))
        }

        const user = await userModel.findOne({ email }).select('+password');

        if (!user || !user.isPasswordCorrect(password)) {
            return next(new AppError('Email or Password does not match', 400))
        }

        const token = await user.generateJWTToken();

        user.password = undefined;

        res.cookie('token', token, cookieOptions)

        res.status(200).json({
            success: true,
            message: 'User loggedin successfully',
            user,
        })
    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}


// logout
const logout = async (_, res, next) => {
    try {
        res.cookie('token', null, {
            secure: true,
            maxAge: 0,
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            message: 'User logout successfully !!'
        })
    }
    catch (error) {
        return next(new AppError(error.message, 500))
    }
}


// get current user details
const getCurrentUser = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await userModel.findById(id);

        res.status(200).json({
            success: true,
            message: 'User details',
            user
        })
    } catch (error) {
        return next(new AppError('failed to fetched current user', 500))
    }
}

// forgot password
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    // check if user does'nt pass email
    if (!email) {
        return next(new AppError('Email is required', 400))
    }

    const user = await userModel.findOne({ email });
    // check if user not registered with the email
    if (!user) {
        return next(new AppError('Email not registered', 400))
    }

    const resetToken = await user.generatePasswordResetToken();

    await user.save();

    const resetPasswordURL = `${process.env.CLIENT_URL}/user/profile/reset-password/${resetToken}`

    const subject = 'Reset Password';
    const message = `You can reset your password by clicking ${resetPasswordURL} Reset your password</$>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordURL}.\n If you have not requested this, kindly ignore.`;

    try {
        await sendEmail(email, subject, message);

        res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email}`,
        });
    } catch (error) {
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;
        await user.save();
        return next(new AppError(error.message, 500));
    }

}


// reset password
const resetPassword = async (req, res, next) => {
    try {
        const { resetToken } = req.params;

        const { password } = req.body; 

        const forgotPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        const user = await userModel.findOne({
            forgotPasswordToken,
            forgotPasswordExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return next(new AppError("Token is invalid or expired, please try again", 400));
        }

        user.password = password;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })
    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}

// change password
const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const { id } = req.user;

        if (!oldPassword || !newPassword) {
            return next(new AppError("old password and new password must be required", 400));
        }

        const user = await userModel.findById(id).select('+password');

        if (!user) {
            return next(new AppError("User does not exist", 400));
        }

        if (!(user.isPasswordCorrect(oldPassword))) {
            return next(new AppError("Invalid Old Password", 400));
        }

        user.password = newPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })
    } catch (error) {
        return next(new AppError(error.message, 500))
    }

}

// update profile
const updateUser = async (req, res, next) => {
    try {
        const { fullName } = req.body;
        const { id } = req.user;

        // console.log(fullName);

        const user = await userModel.findById(id);

        if (!user) {
            return next(new AppError("user does not exist", 400));
        }

        if (fullName) {
            user.fullName = fullName
        }

        if (req.file) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);

            try {
                const newAvatar = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'Learning-Management-System',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill'
                })

                if (newAvatar) {
                    user.avatar.public_id = newAvatar.public_id;
                    user.avatar.secure_url = newAvatar.secure_url;

                    // Remove file from server
                    fs.rmSync(`uploads/${req.file.filename}`);

                }
            } catch (error) {
                return next(new AppError(error.message || 'File not uploaded, please try again', 500))
            }
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "User update successfully",
            user
        })
    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}

export {
    register,
    login,
    logout,
    getCurrentUser,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser
}