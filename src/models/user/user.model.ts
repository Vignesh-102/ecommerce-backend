// src/models/user/user.model.ts

import { Schema, model } from "mongoose";
import { IUser } from "./user.types";
import { USER_ROLES } from "./user.const";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please use a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
      maxLength: 15,
      select: false
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: USER_ROLES[0],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<IUser>("User", userSchema);
