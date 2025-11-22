import { Schema, model } from "mongoose";

const TrainingTaskSchema = new Schema({
  trainingId: { 
    type: String, ref: 'Training', required: true
  },

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

export const TrainingTask = model('TrainingTask', TrainingTaskSchema);
export const TrainingTaskDocument = typeof TrainingTask.prototype;
