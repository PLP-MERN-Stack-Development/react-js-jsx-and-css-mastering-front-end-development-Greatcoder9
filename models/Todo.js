import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  complete: { type: Boolean, default: false },
});

export default mongoose.model("Todo", TodoSchema);
