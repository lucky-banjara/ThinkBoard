import express from "express"
import { createNote, deleteNote, getNoteById, getAllNotes, updateNote } from "../controllers/notesConroller.js";
import { validateId, validateNoteBody } from "../middleware/validateNote.js";

const router = express.Router();

router.get("/", getAllNotes)

router.get("/:id", validateId,  getNoteById)

router.post("/", validateNoteBody, createNote) 

router.put("/:id", validateId, updateNote)

router.delete("/:id", validateId, deleteNote)

export default router;
