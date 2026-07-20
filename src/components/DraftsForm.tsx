import { useForm } from 'react-hook-form'
// import Tiptap from '../Tiptap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export type draftsFormValue = {
        id: String,
        user_id: number,
        title: String,
        description: String,
        story: String,
    }
const DraftsForm = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
    const form = useForm<draftsFormValue>({
        defaultValues: {
            title: "",
            description: "No description provided",
            story: ""
        }
    });
    const {register, handleSubmit, formState} = form;
    const {errors} = formState;

    const onSubmit = async(data: draftsFormValue)=>{
        console.log(JSON.stringify(data));
        const newDraft: draftsFormValue = {
            id: crypto.randomUUID(),
            user_id: user?.id || 0,
            title: data.title,
            description: data.description,
            story: data.story
        }

        const allDrafts: draftsFormValue[] = JSON.parse(
            localStorage.getItem("drafts") || "[]"
        );
        const myDrafts = allDrafts.filter(
          (draft: {user_id: number}) => draft.user_id == user?.id
        );
        myDrafts.push(newDraft);

        localStorage.setItem("drafts", JSON.stringify(myDrafts));
        navigate('/stories');
    }

    const publishStory = ()=>{
      console.log("Story sent for publication");
    }
  return (
    <div className="w-full flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-[80%] sm:w-[30%] flex flex-col">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              }
            })} />
            <p className="error">{errors.title?.message}</p>
          </div>
  
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" {...register("description")} />
            <p className="error">{errors.description?.message}</p>
          </div>
  
          <div className="form-control">
            <label htmlFor="story">Story</label>
            <textarea id="story" className='border w-full' {...register("story", {
                required: {
                    value: true,
                    message: "Story is required"
                }
            })}></textarea>

            <p className="error">{errors.story?.message}</p>

            {/* <div className='w-full h-[30vh] border'>
              <Tiptap />
            </div> */}
            
          </div>

          <div className='w-full flex justify-between'>
            <button className="submit-btn">Save Draft</button>
            <button onClick={publishStory} className='submit-btn bg-green-700 text-white border-none!'>Submit Story</button>
          </div>
  
        </form>
    </div>
  )
}

export default DraftsForm
