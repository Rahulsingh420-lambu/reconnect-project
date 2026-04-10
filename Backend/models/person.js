import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    location: String,
    description: String,
    image: String,

    status: {
      type: String,
      enum: ["missing", "found"],
      default: "missing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Person", personSchema);