import mongoose, { Schema, Document } from 'mongoose';
import User from './user';

// Define the User interface
interface IWork extends Document {
  Title: string;
  Description: string;
  Author: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: mongoose.ObjectId;
}

// Define the Work Schema
const WorkSchema: Schema<IWork> = new Schema({
  Title: {
    type: String,
    required: true,
    trim: true,
    minlength: 10
  },
  Description: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength:15
  },
  Author: {
    type: String,
    required: true,
    minlength: 6
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  status: {
    type: Boolean,
    required:true,
    default: false
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



// Check if the model is already defined
const Work = mongoose.models.Work || mongoose.model<IWork>('Work', WorkSchema);

export default Work;
