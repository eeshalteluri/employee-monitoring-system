"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    emailVerified: { type: Boolean, required: true },
    role: {
        type: String,
        enum: ["admin", "employee", "client", "applicant"],
        required: true,
    },
    phone: { type: String },
    image: { type: String },
    metadata: { type: Object },
    isActive: { type: Boolean, default: true },
    assignedClientIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "clients" }],
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.model.js.map