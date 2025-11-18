import { Schema, model } from "mongoose";

const UpdateSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },

    authorId: {
      type: Schema.Types.ObjectId,
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

    attachments: [{ type: Schema.Types.ObjectId, ref: "files" }],

    visibleToClient: { type: Boolean, default: false },

    meta: { type: Object },
  },
  { timestamps: true }
);

export const Update = model("updates", UpdateSchema);
export type UpdateDocument = typeof Update.prototype;
