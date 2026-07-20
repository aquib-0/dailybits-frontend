import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";

const ProfilePage = () => {
  const location = useLocation();
  const {setOpen} = useSidebar();
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
    // <div className='h-screen flex flex-1 justify-center items-center'>
    //   This is the profile page
    // </div>
    <div className='flex flex-1 h-screen pt-[10vh]'>
      <div className="w-full flex flex-col items-start overflow-y-scroll px-2 sm:px-10 md:px-20 gap-y-10"> {/*pt-20*/}
        <h1 className="text-4xl font-bold mt-20">Profile</h1>  {/*Change heading to the users email*/}
        <div className="w-full h-fit flex justify-start items-center bg-white text-gray-500 border-gray-300 border-b gap-x-10 sticky top-0">
          <Link to="" className={`h-full py-3 ${location.pathname === `/profile`? 'border-black border-b text-black' : ''}`}>Home</Link>
          <Link to="reposts" className={`h-full py-3 ${location.pathname === '/profile/reposts'? 'border-black border-b text-black' : ''}`}>Reposts</Link>
          <Link to="activity" className={`h-full py-3 ${location.pathname === '/profile/activity'? 'border-black border-b text-black' : ''}`}>Activity</Link>
          <Link to="about" className={`h-full py-3 ${location.pathname === '/profile/about'? 'border-black border-b text-black' : ''}`}>About</Link>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
