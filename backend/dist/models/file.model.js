"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModel = void 0;
const mongoose_1 = require("mongoose");
const FileSchema = new mongoose_1.Schema({
    filename: String,
    fileType: String,
    size: Number,
    pathKey: String, // S3 object key
    url: String,
    uploaderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
    projectId: { type: mongoose_1.Schema.Types.ObjectId, ref: "projects" },
    uploadedAt: { type: Date, default: Date.now },
    meta: { type: Object },
});
exports.FileModel = (0, mongoose_1.model)("files", FileSchema);
//# sourceMappingURL=file.model.js.map