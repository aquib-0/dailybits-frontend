import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import type { DraftType } from '../../context/DraftContext';
import { useSidebar } from '../../context/SidebarContext';
import "./ReadStoryPage.scss";

const ReadStoryPage = () => {
    const {setOpen} = useSidebar();
    useEffect(()=>{
        setOpen(false);
    }, []);
    const location = useLocation();
    const draft:DraftType = location.state.clicked_draft;

  return (
    <div className='w-full h-screen flex flex-col justify-start items-center pt-[10vh] relative'>
        {/* <p>This is the story page and here is the story</p> */}
        <div id='readStory' dangerouslySetInnerHTML={{__html: draft.content}} className='w-[90%] md:w-[60%] h-full overflow-y-scroll p-2' />
    </div>
  )
}

export default ReadStoryPage