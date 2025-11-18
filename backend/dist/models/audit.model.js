"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audit = void 0;
const mongoose_1 = require("mongoose");
const AuditSchema = new mongoose_1.Schema({
    collectionName: String,
    documentId: { type: mongoose_1.Schema.Types.ObjectId },
    action: {
        type: String,
        enum: ["create", "update", "delete"],
    },
    performedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
    timestamp: { type: Date, default: Date.now },
    before: Object,
    after: Object,
    reason: String,
});
exports.Audit = (0, mongoose_1.model)("audits", AuditSchema);
//# sourceMappingURL=audit.model.js.map