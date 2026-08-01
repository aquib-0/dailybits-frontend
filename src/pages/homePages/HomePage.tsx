import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";

const HomePage = () => {
  const location = useLocation();
  const {open, setOpen}  = useSidebar();
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
    <div className={`flex flex-1 h-screen pt-[10vh]`}>
      <div className={`w-full flex flex-col items-start overflow-y-scroll ${open? 'md:px-6':'md:px-20 px-2'} gap-y-10`}>  {/*pt-20*/}
        <div className="w-full h-fit flex justify-start items-center bg-white text-gray-500 border-gray-300 border-b gap-x-10 mt-20 sticky top-0">
          <Link to="" className={`h-full py-3 ${location.pathname === `/home`? 'border-black border-b text-black' : ''}`}>For you</Link>
          <Link to="featured" className={`h-full py-3 ${location.pathname === '/home/featured'? 'border-black border-b text-black' : ''}`}>Featured</Link>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default HomePage

