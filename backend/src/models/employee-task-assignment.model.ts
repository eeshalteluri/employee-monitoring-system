import { model, Schema } from "mongoose";

const EmployeeTaskAssignmentSchema = new Schema({
  employeeTaskId: { 
    type: String, ref: 'EmployeeTask', required: true
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

export const EmployeeTaskAssignment =  model('EmployeeTaskAssignment', EmployeeTaskAssignmentSchema);
export const EmployeeTaskAssignmentDocument = typeof EmployeeTaskAssignment.prototype;
