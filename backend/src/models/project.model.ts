import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    // Basic project fields
    title: { type: String, required: true },

    status: {
      type: String,
      enum: [
        "completed",
        "cancelled",
        "client",
        "meeting done",
        "contact made",
        "active",
        "recontacted",
        "stalled",
        "requirements sent",
        "waiting for requirement",
        "awaiting testimonial",
        "training"
      ],
      default: "active"
    },

    description: { type: String },

    fileLinks: [{ type: String }],

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client"
    },

    projectType: {
      type: String,
      enum: ["client", "research", "management", "training"]
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    estimatedHoursRequired: { type: Number },
    totalHoursTaken: { type: Number },

    startDate: { type: Date },
    endDate: { type: Date },

    isAssigned: { type: Boolean, default: false },

    assignees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
      }
    ],

    leadAssignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },

    VAIncharge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },

    freelancers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Freelancer"
      }
    ],

    updateIncharge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },

    codersRecommendation: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
      }
    ],

    leadership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },

    githubLinks: [{ type: String }],
    loomLinks: [{ type: String }],

    clientWhatsappGroupLink: { type: String },
    teamWhatsappGroupLink: { type: String },
    slackGroupLink: { type: String },

    clientUpsetOrDidntReply3Days: { type: Boolean, default: false },

    clientHandling: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },

    selectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },

    askUpdate: { type: String },

    tags: [
      {
        type: String,
        enum: ["stock"]
      }
    ],

    remarks: { type: String },

    milestones: [
      {
        title: { type: String, required: true },
        description: { type: String },
        dueDate: { type: Date },
        isCompleted: { type: Boolean, default: false },
        completedAt: { type: Date },

        assignedTo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee"
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
