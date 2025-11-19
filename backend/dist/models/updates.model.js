"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update = void 0;
const mongoose_1 = require("mongoose");
const UpdateSchema = new mongoose_1.Schema({
    projectId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "projects",
        required: true,
    },
    authorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    type: {
        type: String,
        enum: ["daily", "training", "note"],
        default: "daily",
    },
    date: { type: Date, required: true },
    summary: String,
    checklist: [
        {
            text: String,
            checked: Boolean,
        },
    ],
    nextPlan: String,
    attachments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "files" }],
    visibleToClient: { type: Boolean, default: false },
    meta: { type: Object },
}, { timestamps: true });
exports.Update = (0, mongoose_1.model)("updates", UpdateSchema);
//# sourceMappingURL=updates.model.js.map