"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const mongoose_1 = require("mongoose");
const ClientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String },
    contactName: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    links: {
        github: String,
        onedrive: String,
        loom: String,
        whatsapp: String,
    },
    tags: [String],
    notes: String,
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
}, { timestamps: true });
exports.Client = (0, mongoose_1.model)("clients", ClientSchema);
//# sourceMappingURL=client.model.js.map