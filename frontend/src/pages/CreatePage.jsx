import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import {Link, useNavigate} from "react-router"
import toast from 'react-hot-toast';
import api from "../lib/axios"

const CreatePage = () => {
  const [title, setTitle]= useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // validation
    if(!title.trim() || !content.trim()){
      toast.error("All fields are required");
      return;
    }

    setLoading(true)

    try {

      await api.post ("/notes", {
        title,
        content
      })
      toast.success("Note created successfully !")
      navigate("/")
      
    } catch (error) {
      console.log("Error creating note", error);

      // check rate limiting
      if(error.response.status === 429){
        toast.error("Slow down ! You're creating note too fast !", {
          duration : 4000,
          icon : "!"
        })
      } else {
       toast.error("Failed to create note!, Plaease try again later")
      }
      
      
    } finally {
      setLoading(false)
    }
    
    

  }

//   return (
//     <div className="min-h-screen bg-base-200">
//       <div className='container mx-auto px-4 py-8 '>
//         <div className = "max-w-2xl mx-auto">
//           <Link to={"/"} className='"btn btn-ghost mb-6 '>
//             <ArrowLeftIcon className= "size-5"/>
//              Back to Notes
//            </Link>

//            <div className = "card bg-base-100">
//             <div className="card-body">
//               <h2 className="card-title text-2xl mb-4">Create New Note</h2>

//               <form onSubmit={handleSubmit}>
//                 <div className="form-control mb-4">
//                   <label  className="label">
//                     <span className="label-text">Title</span>
//                   </label>
//                   <input type="text" 
//                          placeholder ="Note Title" 
//                          className='input input-bordered'
//                          value={title}
//                          onChange = {(e)=>setTitle(e.target.value)}
//                   />
//                 </div>

//                 <div className="form-control mb-4">
//                   <label className="label">
//                     <span className="label-text">Content</span>
//                   </label>
//                   <textarea
//                     placeholder="Write your note here..."
//                     className="textarea textarea-bordered h-32"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                   />
//                 </div>

//                <div className="card-actions justify-end">
//                  <button type="submit" className="btn btn-primary" disabled={loading}>
//                   {loading ? "Createing..." : "Create Note"}
//                  </button>
//                </div>
//               </form>

//             </div>
//            </div>
//         </div>
//       </div>
//     </div>
//   )
// }

return (
    <div className="min-h-screen bg-base-200">
      <div className='container mx-auto px-4 py-8'>
        <div className = "max-w-2xl mx-auto">
          {/* Fixed nested quotes typo and added layout alignment */}
          <Link to={"/"} className='btn btn-ghost mb-6 flex items-center w-fit gap-2'>
            <ArrowLeftIcon className= "size-5"/>
             Back to Notes
           </Link>

           {/* Added shadow-xl for visual depth consistent with Detail view */}
           <div className = "card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>

              <form onSubmit={handleSubmit}>
                {/* Added flex-col to keep the label on top */}
                <div className="form-control flex flex-col mb-4">
                  <label className="label">
                    <span className="label-text font-medium">Title</span>
                  </label>
                  {/* Added w-full to make it full width */}
                  <input type="text" 
                         placeholder ="Note Title" 
                         className='input input-bordered w-full'
                         value={title}
                         onChange = {(e)=>setTitle(e.target.value)}
                  />
                </div>

                {/* Added flex-col to keep the label on top */}
                <div className="form-control flex flex-col mb-6">
                  <label className="label">
                    <span className="label-text font-medium">Content</span>
                  </label>
                  {/* Added w-full to make it full width and changed height to h-48 for symmetry */}
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-48 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

               <div className="card-actions justify-end">
                 <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "Create Note"}
                 </button>
               </div>
              </form>

            </div>
           </div>
        </div>
      </div>
    </div>
  )
}


export default CreatePage