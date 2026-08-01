import { useEffect, useState } from "react";
import type { DraftType } from "../../context/DraftContext";
import { fetchFypPosts } from "../../utils/storyService";
import DraftsComponent from "../../components/DraftsComponent";

const ForYouPage = () => {
  const [fypPosts, setFypPosts] = useState<DraftType[] | []>([]);
  
  useEffect(()=>{
    const getFyp = async()=>{
    const data = await fetchFypPosts();
    // console.log("Data recieved in home page:", data);
    setFypPosts(data.fyp_posts);
    };
    getFyp();
  }, []);
  return (
    <div className='h-screen flex flex-1'>
      <div className="w-full h-fit flex flex-col items-start">
        {
        fypPosts.length > 0? (
          fypPosts.map((eachPost, index)=> {
          return (
              <div className="w-full flex flex-col items-center" key={index}>
                <DraftsComponent draft_={eachPost} isFyp={true} />
                <hr className="w-full text-gray-300" />
              </div>
          )
        })
        ) : (
          <p>This is the home page</p>
        )
      }
      </div>
    </div>
  )
}

export default ForYouPage