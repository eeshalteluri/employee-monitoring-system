import { Schema, model } from "mongoose";

const TrainingTaskUpdateSchema = new Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  trainingTaskAssignmentId: { 
    type: String, 
    ref: 'TrainingTaskAssignment', 
    required: true 
  },
  trainingId: { 
    type: String, 
    ref: 'Training', 
    required: true 
  },
  trainingTaskId: { 
    type: String, 
    ref: 'TrainingTask', 
    required: true 
  },
  employeeId: { 
    type: String, 
    ref: 'Employee', 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String 
  },
  isApproved: { 
    type: Boolean, 
    default: false 
  },
  approvedBy: { 
    type: String, 
    ref: 'User' 
  }, 
  notes: { type: String },
  attachments: { type: [String], default: [] }
}, { timestamps: true });

export const TrainingTaskUpdate = model('TrainingTaskUpdate', TrainingTaskUpdateSchema);
export const TrainingTaskUpdateDocument = typeof TrainingTaskUpdate.prototype;
