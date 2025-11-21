const mongoose = require('mongoose');

const TrainingTaskSchema = new mongoose.Schema({
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
module.exports = mongoose.model('TrainingTask', TrainingTaskSchema);
