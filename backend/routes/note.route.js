import express from "express";
import { NoteModel } from "../model/note.model.js";
import auth from "../middleware/auth.middleware.js";

const noteRouter = express.Router();

// CREATE ROUTE
noteRouter.post("/create", auth, async (req, res) => {
  const { title, content, status } = req.body;

  const userId = req.user._id;
  const user = req.user;
  try {
    const note = new NoteModel({
      title,
      content,
      status,
      userId,
    });
    await note.save();
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    res
      .status(404)
      .json({ Message: `Error while creating note ${error.message}` });
  }
});

// GET ROUTE
noteRouter.get("/", async (req, res) => {
  const userId = req.user._id;
  try {
    const notes = await NoteModel.find({ userId });
    res.status(201).json({ notes });
  } catch (error) {
    res.status(404).json({ Message: `Error while creating note ${error}` });
  }
});

// UPDATE ROUTE
noteRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const noteId = req.params.id;
  const userId = req.user.id;

  try {
    const note = await NoteModel.findOne({ _id: noteId });

    if (note.userId.toString() === userId.toString()) {
      await NoteModel.findByIdAndUpdate({ _id: noteId }, payload);
      res.status(201).json({ message: "Note updated successfully" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// noteRouter.delete("/delete", async (req, res) => {
//   const noteId = req.params.id;
//   const userId = req.user._id;

//   try {
//     const note = await NoteModel.findOne({ _id: noteId });

//     if (note.userId.toString() === userId.toString()) {
//       await NoteModel.findByIdAndDelete({ _id: noteId });
//       res.status(201).json({ message: "Note Deleted successfully" });
//     } else {
//       res.status(401).json({ message: "Unauthorized" });
//     }
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

export default noteRouter;
