const mongoose = require('mongoose');

const EmployeeTaskAssignmentSchema = new mongoose.Schema({
  id: { 
    type: String, required: true, unique: true 
  },
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
module.exports = mongoose.model('EmployeeTaskAssignment', EmployeeTaskAssignmentSchema);
