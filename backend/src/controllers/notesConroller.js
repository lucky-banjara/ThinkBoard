import Note from "../models/Note.js"


// export const getAllNotes = (req,res)=>{
//      res.status(200).send("You just feteched the notes")
//  }
// u can use arrow which is above or below regular function 

 export async function getAllNotes (req,res){
     try {
        const notes = await Note.find().sort({createdAt:-1}) 
        // -1 will short in descending order, i.e newest ones first
        return res.status(200).json(notes);
     } catch (error) {
        console.error("Error in getAllNotes Controller", error);
        return res.status(500).json({message: "Internal Server Error"})
        
     }
 }

//  export async function getNoteById(req,res){
//     try {
//         const note = await Note.findById(req.params.id);
//         if(!note) {
//             return res.status(404).json({message: "Note not found"});}

//             return res.status(200).json(note);

//     } catch (error) {
//         console.error("Error in getNoteById Controller", error);
//         return res.status(500).json({message: "Internal Server Error"})
//     }
//  }

export async function getNoteById(req, res) {
  try {
    // 1. Check if the ID is a valid MongoDB ObjectId
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //   return res.status(400).json({ message: "Invalid ID format" });
    // }

    // 2. Query the database
    const note = await Note.findById(req.params.id);
    
    // 3. Check if document exists
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById Controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

 export async function createNote(req,res) {
     try {
        const {title,content} = req.body

        const note = new Note({title,content})
        const savedNote = await note.save()
        return res.status(201).json({savedNote, message:"Note created successfully"})
        
     } catch (error) {
        console.error("Error in createNote Controller", error);
        return res.status(500).json({message: "Internal Server Error"})
     }
}

export async function updateNote(req, res){
     try {
        const {title,content} =req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            {title,content},
            {
                new: true,
            }
            
        );

        if (!updatedNote) {
            return res.status(404).json({message: "Note not found"});
        }

        res.status(200).json({updatedNote})
     } catch (error) {
        console.error("Error in updateNote Controller", error);
        return res.status(500).json({message: "Internal Server Error"})
     }
 }



 export async function deleteNote(req, res){
    try {
       const deletedNote = await Note.findByIdAndDelete(req.params.id)
       if(!deletedNote) return res.status(404).json({message: "Note not found"})
       return res.status(200).json({message:"Note deleted successfully"})
      } catch (error) {
        console.error("Error in deleteNote Controller", error);
        return res.status(500).json({message: "Internal Server Error"})
    }
 }

