import { Document, Types } from "mongoose";
import { UserRole } from "./user.const";

export interface IUser extends Document {
   _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>; // ✅ Add this
}
