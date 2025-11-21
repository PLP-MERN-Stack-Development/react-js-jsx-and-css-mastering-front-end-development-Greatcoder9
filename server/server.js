import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Todo from "./models/Todo.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // <-- REQUIRED

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

// Routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo({ text: req.body.text });
  await todo.save();
  res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { complete: req.body.complete },
    { new: true }
  );
  res.json(updated);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
