import { Schema, model, Document } from "mongoose";

export interface UserType extends Document {
  link: string;
  lowerBound: number;
  email: string;
}

const UserSchema = new Schema({
  link: {
    type: String,
    required: true,
    trim: true,
  },
  lowerBound: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
});

const UserData = model<UserType>("MyUserData", UserSchema);

export default UserData;
