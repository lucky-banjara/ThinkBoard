import mongoose from "mongoose";

// Middleware to check if the URL parameter ID is a valid MongoDB ObjectId
export function validateId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  next(); // Pass control to the next middleware or controller
}

// Middleware to check if creation data is present
export function validateNoteBody(req, res, next) {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  next(); // Pass control to the next middleware or controller
}