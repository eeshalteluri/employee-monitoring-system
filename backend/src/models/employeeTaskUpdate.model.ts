const mongoose = require('mongoose');

const EmployeeTaskUpdateSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  employeeTaskAssignmentId: { 
    type: String, 
    ref: 'EmployeeTaskAssignment', 
    required: true 
  },
  employeeId: { 
    type: String, 
    ref: 'Employee', 
    required: true 
  },
  employeeTaskId: { 
    type: String, 
    ref: 'EmployeeTask', 
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
    ref: 'Employee' 
  }, 
  notes: { type: String },
  attachments: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('EmployeeTaskUpdate', EmployeeTaskUpdateSchema);
