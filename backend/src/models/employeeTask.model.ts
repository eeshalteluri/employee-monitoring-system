const mongoose = require('mongoose');

const EmployeeTaskSchema = new mongoose.Schema({
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
module.exports = mongoose.model('EmployeeTask', EmployeeTaskSchema);
