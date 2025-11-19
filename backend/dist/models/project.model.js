"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    slug: { type: String, index: true },
    description: { type: String },
    clientId: { type: mongoose_1.Schema.Types.ObjectId, ref: "clients", required: true },
    tags: [String],
    projectType: String,
    priority: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium",
    },
    estimatedHours: Number,
    startDate: Date,
    endDate: Date,
    status: {
        type: String,
        enum: ["planned", "active", "on-hold", "completed", "cancelled"],
        default: "planned",
    },
    assignments: {
        leadAssignee: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
        virtualAssistant: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
        freelancers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "users" }],
        coders: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "users" }],
    },
    links: {
        github: String,
        onedrive: String,
        loom: String,
        whatsapp: String,
    },
    milestones: [
        {
            title: String,
            dueDate: Date,
            status: String,
        },
    ],
    lifecycle: [
        {
            state: String,
            changedAt: Date,
            by: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
        },
    ],
    meta: { type: Object },
}, { timestamps: true });
exports.Project = (0, mongoose_1.model)("projects", ProjectSchema);
//# sourceMappingURL=project.model.js.map