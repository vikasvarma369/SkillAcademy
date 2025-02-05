import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 4 character"],
      maxLength: [20, "Name should be less than 20 character"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
        "Must be 6 chars with at least one uppercase, one lowercase, and one number",
      ],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    bio: {
      type: String,
      maxLength: [200, "Bio cannot exceed 200 characters"],
    },
    role: {
      type: String,
      enum: {
        values: ["student", "instructor", "admin"],
        message: "Please select a valid role",
      },
      default: "student",
    },
    enrolledCourses: [
      {
        course: {
          type: mongoose.Schema.ObjectId,
          ref: "Course",
        },
        enrolledAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdCourses: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
      },
    ],
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    // subscription: {
    //   id: String,
    //   status: String,
    // },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare user password
userSchema.methods.comparePassword = async function (givedPassword) {
  return await bcrypt.compare(givedPassword, this.password);
};

// Generate Reset password Token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.forgotPasswordExpiry = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

// virtual field for Total Enrolled courses
userSchema.virtual("TotalEnrolledCourses").get(function () {
  return this.enrolledCourses.length;
});

// virtual field for Total Created courses
userSchema.virtual("TotalCreatedCourses").get(function () {
  return this.createdCourses.length;
});

// last active
userSchema.methods.updateLastActive = async function () {
  this.lastActive = Date.now();
  return await this.lastActive({
    validateBeforeSave: false,
  });
};

userSchema.methods = {
  generateJWTToken: function () {
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
        role: this.role,
        subscription: this.subscription,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
  },

  generatePasswordResetToken: async function () {
    const resetToken = await crypto.randomBytes(20).toString("hex");

    this.forgotPasswordToken = await crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 min from now

    return resetToken;
  },
};

export default model("User", userSchema);
