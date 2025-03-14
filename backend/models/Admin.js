import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: { type: String, default: "admin" },
  password: { type: String, default: "admin" }, // Ideally, this should be hashed
});

export default mongoose.model("Admin", AdminSchema);