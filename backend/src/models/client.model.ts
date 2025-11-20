import { Schema, model } from "mongoose";

const ClientSchema = new Schema(
  {
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

    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

export const Client = model("Client", ClientSchema);
export type ClientDocument = typeof Client.prototype;
