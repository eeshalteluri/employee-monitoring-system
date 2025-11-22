import { model, Schema } from "mongoose";


const EmployeeTaskSchema = new Schema({
  title: { 
    type: String, required: true
  },

  description: { 
    type: String
  },

  defaultTask: { 
    type: Boolean, default: true 
  },
  startDate: { 
    type: Date 
  },
  endDate: { 
    type: Date 
  },
  attachments: { 
    type: [String], default: [] 
  },
  weight: { 
    type: Number 
  }
}, { timestamps: true });

export const EmployeeTask =  model('EmployeeTask', EmployeeTaskSchema);
export type EmployeeTaskDocument = typeof EmployeeTask.prototype;
