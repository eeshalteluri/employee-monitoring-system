const mongoose = require('mongoose');

const TrainingTaskAssignmentSchema = new mongoose.Schema({
  id: { 
    type: String, required: true, unique: true 
  },
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
module.exports = mongoose.model('TrainingTaskAssignment', TrainingTaskAssignmentSchema);
