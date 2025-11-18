import { Schema, model } from "mongoose";

const FileSchema = new Schema({
  filename: String,
  fileType: String,
  size: Number,

  pathKey: String, // S3 object key

  url: String,

  uploaderId: { type: Schema.Types.ObjectId, ref: "users" },

  projectId: { type: Schema.Types.ObjectId, ref: "projects" },

  uploadedAt: { type: Date, default: Date.now },

  meta: { type: Object },
});

export const FileModel = model("files", FileSchema);
export type FileDocument = typeof FileModel.prototype;
