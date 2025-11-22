import { Schema, model } from "mongoose";

const ClientSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    phone: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: ["new", "existing"],
      default: "new",
    },

    isActive: {
      type: Boolean,
      ddefault: true,
    }
  },
  { timestamps: true }
);

export const Client = model("Client", ClientSchema);
export type ClientDocument = typeof Client.prototype;
