import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    shortDescription: {
      type: String,
      required: true
    },

    fullDescription: {
      type: String,
      required: true
    },

    partner: {
      name: {
        type: String,
        required: true
      },
      logo: {
        type: String // image URL
      },
      website: {
        type: String
      },
      contactEmail: {
        type: String
      }
    },

    eligibility: {
      type: [String], // array of conditions
      required: true
    },

    accessLevel: {
      type: String,
      enum: ["public", "locked"],
      default: "public"
    },

    expiryDate: {
      type: Date
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Deal", dealSchema);
