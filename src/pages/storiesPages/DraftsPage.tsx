import { useEffect } from "react";
import { Link } from "react-router-dom";
import DraftsComponent from "../../components/DraftsComponent";
import { useDrafts } from "../../context/DraftContext";
import { useSidebar } from "../../context/SidebarContext";

const DraftsPage = () => {
  const {setOpen} = useSidebar();
  const {draft} = useDrafts();
  useEffect(()=>{
    setOpen(true);
  }, []);


  return (
    <div className="w-full h-fit flex flex-col justify-start items-center gap-y-4 pb-5 relative">
      {draft.length > 0 ? (
        draft.map((eachDraft, key) => (
            <DraftsComponent key={key} draft_={eachDraft} isFyp={false} />
        ))
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h1>No stories in draft</h1>
          <Link
            to="/stories/write"
            className="text-green-700 underline"
          >
            Write a story?
          </Link>
        </div>
      )}
      <div className="w-full flex justify-center sm:justify-end sticky bottom-5">
        <Link to="/stories/write" className="text-white bg-green-700 border rounded-2xl px-4 py-1">
          Write a story ?
        </Link>
      </div>
    </div>
  );
};

export default DraftsPage;