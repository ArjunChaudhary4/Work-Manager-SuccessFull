import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from "bcryptjs";

// Define the User interface
interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Method to compare passwords
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the User Schema
const userSchema: Schema<IUser> = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to hash the password before saving
userSchema.pre<IUser>('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.updatedAt = new Date(); // Ensure `updatedAt` is assigned a Date object
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Check if the model is already defined
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
