import { Schema, model } from "mongoose";

const TrainingTaskAssignmentSchema = new Schema({
  trainingTaskId: { 
    type: String, ref: 'TrainingTask', required: true
  },
  trainingId: { 
    type: String, ref: 'Training', required: true
  },
  employeeId: { 
    type: String, ref: 'Employee', required: true
  },
  type: { 
    type: String, enum: ['default','personal'], 
    default: 'default'
  },
  assignedAt: { type: Date, default: Date.now },
  startDate: { type: Date },
  endDate: { type: Date },
  score: { type: Number } // optional
}, { timestamps: true });

export const TrainingTaskAssignment = model('TrainingTaskAssignment', TrainingTaskAssignmentSchema);
export const TrainingTaskAssignmentDocument = typeof TrainingTaskAssignment.prototype;
