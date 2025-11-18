import { Schema, model } from "mongoose";

const AuditSchema = new Schema({
  collectionName: String,

  documentId: { type: Schema.Types.ObjectId },

  action: {
    type: String,
    enum: ["create", "update", "delete"],
  },

  performedBy: { type: Schema.Types.ObjectId, ref: "users" },

  timestamp: { type: Date, default: Date.now },

  before: Object,

  after: Object,

  reason: String,
});

export const Audit = model("audits", AuditSchema);
export type AuditDocument = typeof Audit.prototype;
