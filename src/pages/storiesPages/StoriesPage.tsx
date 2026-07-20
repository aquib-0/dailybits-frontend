import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSidebar } from "../../context/SidebarContext";

const StoriesPage = () => {
  const {setOpen} = useSidebar();
  const location = useLocation();
  useEffect(()=>{
    if(window.matchMedia('(max-width: 640px)').matches)
    {
      setOpen(false);
    }
    else{
      setOpen(true);
    }
  }, []);

  return (
    <div className='w-full flex flex-1 h-screen pt-[10vh]'>
      <div className="w-full flex flex-col items-start overflow-y-scroll px-2 sm:px-10 md:px-20 gap-y-10"> {/*pt-20*/}
        <h1 className="text-4xl font-bold mt-20">Stories</h1>
        <div className="w-full h-fit flex justify-start items-center bg-white text-gray-500 border-gray-300 border-b gap-x-10 sticky top-0">
          <Link to="" className={`h-full py-3 ${location.pathname === '/stories'? 'border-black border-b text-black' : ''}`}>Drafts</Link>
          <Link to="published" className={`h-full py-3 ${location.pathname === '/stories/published'? 'border-black border-b text-black' : ''}`}>Published</Link>
          <Link to="submissions" className={`h-full py-3 ${location.pathname === '/stories/submissions'? 'border-black border-b text-black' : ''}`}>Submissions</Link>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default StoriesPage
