import { useEffect, useState } from "react";
import DraftsComponent from "../../components/DraftsComponent";
import { getMyPublishedStories } from "../../utils/storyService";
import type { DraftType } from "../../context/DraftContext";

const PublishedPage = () => {
  const [myPosts, setMyPosts] = useState<DraftType[] | []>([]);

  useEffect(()=>{
    const fetchPublished = async()=>{
      const data = await getMyPublishedStories();
      setMyPosts(data.your_posts);
    };
    fetchPublished();
  }, []);

  return (
    <div className='w-full flex flex-col justify-start items-start'>
        {/* This is the published page */}
        {
          myPosts.length > 0? (
            myPosts.map((eachPosts, index)=>{
              return (
                      <div className="w-full flex flex-col items-center" key={index}>
                        <DraftsComponent draft_={eachPosts} isFyp={true} />
                        <hr className="w-full text-gray-300" />
                      </div>
              )
            })
          ) : (
            <>
              <h1>There is no published posts yet</h1>
              <h1>Visit the stories page to start writing one!</h1>
            </>
          )
        }
    </div>
  )
}

export default PublishedPage