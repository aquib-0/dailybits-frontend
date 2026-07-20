import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import type { DraftType } from "../context/DraftContext";
import { useDrafts } from "../context/DraftContext";

// import { GiCook } from "react-icons/gi";
import { FaHandsClapping } from "react-icons/fa6";
import { IoChatbubbleSharp } from "react-icons/io5";
import { RiRepeat2Line } from "react-icons/ri";

const DraftsComponent = ({draft_, isFyp}: {draft_: DraftType, isFyp: boolean})=>{
  const navigate = useNavigate();
  const id = draft_.id;
  const parser = new DOMParser();
  const {draft, setDraft} = useDrafts();
  const doc = parser.parseFromString(draft_.content || "<h1>currentDraft was not detected here!</h1>", "text/html");
  const title = doc.querySelector("h1")?.textContent ?? "Untitled";
  const first_line = doc.querySelector("p")?.textContent ?? "";
  const first_img = doc.querySelector("img");
  // console.log("First image found with source: ", first_img?.src);

  const onDelete = (id: string)=>{
    // console.log("Delete button clicked with draft id: ", id);
    const allDrafts = [...draft];
    // console.log("All drafts before deleting: ", allDrafts);
    const index = allDrafts.findIndex((d: {id: string})=> d.id == id);
    // console.log("Deleting draft from index: ", index);
    // console.log("Deleting draft: ", allDrafts[index]);
    if(index > -1)
    {
      allDrafts.splice(index, 1);
    }
    localStorage.setItem("drafts", JSON.stringify(allDrafts));
    // console.log("After deleting the draft, new draft array that is set in localStorgae: ", allDrafts);
    setDraft(allDrafts);
  };

  const handleCardClick = (e: React.MouseEvent)=>{
    if((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button'))
    {
      return
    }
    if(isFyp)
    {
      navigate("/stories/read", {state: {clicked_draft: draft_}});
    }
    else{
      navigate(`/stories/write/${id}`);
    }
  }
  return (
    isFyp? (
      <div onClick={handleCardClick} className="w-full flex flex-col items-start justify-center gap-y-3 py-2 hover:cursor-pointer my-4 rounded-2xl"> {/*to={`/stories/read`} state={{clicked_draft: draft_}}*/}
        <Link className="flex gap-x-3" to={`/profile/${draft_.user_id}`}>
          <img src={draft_.user_avatar} alt="X" width={25} height={25} className="rounded-full" />
          <h1 className="hover:underline" aria-label="visit profile">{draft_.username}</h1>
          <span>.</span>
          <h1 className="text-gray-500">{draft_.upload_date}</h1>
        </Link>
        <div className="w-full flex flex-col-reverse md:flex-row justify-between">
          <div className="w-full md:w-[50%]">
            <div className="h-full flex flex-col justify-between">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-sm text-gray-500">{first_line}</p>
              </div>
              <div className="w-full h-5 flex gap-x-8 text-gray-500 mt-5">
                <div>
                  {/* <GiCook /> */}
                  <FaHandsClapping />
                </div>

                <div>
                  <IoChatbubbleSharp />
                </div>

                <div>
                  <RiRepeat2Line />
                </div>
              </div>
            </div>
          </div>
          {
            first_img? (<><div className="w-full md:w-[200px] h-full"><img src={first_img.src} className="w-full h-full object-cover aspect-3/2" alt="img" /></div></>): (<></>)
          }
        </div>
      </div>
    ) : (
      <div onClick={handleCardClick} className="w-full flex flex-col items-start justify-center gap-y-5 px-4 py-2 hover:cursor-pointer mb-4 border-gray-300 border rounded-2xl"> {/*to={`/stories/write/${id}`}*/}
        {/* <Link className="flex gap-x-1 px-1 text-gray-500" to={`/profile/${draft_.user_id}`}>
          <img src={draft_.user_avatar} alt="X" width={25} height={25} className="rounded-full" />
          <h1>{draft_.username}</h1>
          <span>.</span>
          <h1>{draft_.upload_date}</h1>
        </Link> */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-sm text-gray-500">{first_line}</p>
        </div>
        <div className="flex gap-x-2">
          <button onClick={()=> onDelete(id)} className="flex items-center gap-x-2 border rounded-3xl px-2 font-bold py-1 bg-[#D10000] text-white hover:cursor-pointer">
            <div className="border rounded-full p-1 bg-white"><FaRegTrashAlt size={16} fill="#D10000" /></div>
            Delete
          </button>
        </div>
      </div>
    )
  )
}

export default DraftsComponent