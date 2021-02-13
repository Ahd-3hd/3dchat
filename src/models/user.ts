import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true, index: true },
    password: { type: String, required: true, trim: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>('User', UserSchema);
