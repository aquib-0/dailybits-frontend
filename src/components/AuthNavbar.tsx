import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';

import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';

import { LiaEditSolid } from "react-icons/lia";
import { PiBellThin } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";


const AuthNavbar = () => {

    const profileRefs = useRef<(HTMLDivElement | null)[]>([]);
    const navigate = useNavigate();
    const {logout, user} = useAuth();
    const first_letter = user?.username.slice(0, 2);
    const {open, setOpen} = useSidebar();
    const [profileOpen, setProfileOpen] = useState(false);
    useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // 2. Check if the click was outside EVERY single div in our array
      const clickedOutsideAll = profileRefs.current.every(
        (div) => div && !div.contains(event.target as Node)
      );

      if (clickedOutsideAll) {
        // console.log("Clicked outside every tracked div!");
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className='w-full h-[10vh] flex justify-between items-center px-2 sm:px-6 md:px-6 border bg-white fixed top-0 z-30'>
        <div className="font-bold text-2xl flex items-center gap-x-5">
            <div className='hover:cursor-pointer'>
                <RxHamburgerMenu size={24} onClick={()=>{setOpen(!open);}} />
            </div>
            <Link to="/home" className="text-lg sm:text-2xl">DailyBits</Link>
            <input className='hidden! md:block!' type="search" id="search" placeholder="Search..." />
        </div>

        <div className="h-full flex justify-center items-center gap-x-2 sm:gap-x-6 relative">
            <Link to='/stories/write' className='flex items-center'><LiaEditSolid size={24} />Write</Link>
            <Link to='#' className='hidden sm:flex'><PiBellThin size={24} /></Link>
            <div id='user_avatar' ref={(el) => { profileRefs.current[0] = el; }} onClick={()=> {setProfileOpen(!profileOpen);}} className='w-7.5 h-7.5 rounded-full border hover:cursor-pointer'> {/*w-[30px]*/}
                <img src={user?.user_avatar} alt={`${first_letter}`} className='w-full h-full rounded-full' />
            </div>
            {
            profileOpen && (
            <div id='hovering_profile' ref={(el) => { profileRefs.current[1] = el; }} className='w-[60vw] sm:w-[40vw] md:w-[20vw] h-auto flex flex-col items-start justify-start p-6 gap-y-8 absolute top-13 -right-4 text-sm border-gray-200 border bg-white shadow-xl'>
                <div className='w-full flex items-center justify-start gap-x-4'>
                    <div className='w-12.4 h-12.5 rounded-full'> {/*w-[50px] h-[50px]*/}
                        <img src={user?.user_avatar} alt="" className='w-full h-auto rounded-full' />
                    </div>
                    <div className='h-full flex flex-col text-gray-500'>
                        <span>{user?.email}</span>
                        <span><Link to={`/profile/${user?.id}`}>View profile</Link></span>
                    </div>
                </div>
                <div className='w-full'>
                    <Link to='/settings' className='text-gray-500 hover:text-black flex items-center gap-x-3'><span><IoSettingsOutline size={20} /></span> Settings</Link>
                </div>
                <div className='w-full flex flex-col gap-y-2'>
                    <hr className='w-[95%] text-gray-300' />
                    <button onClick={()=>{logout(); navigate('/auth/login');}} className='flex flex-col items-start text-gray-500 hover:text-black hover:cursor-pointer'><span>Logout</span> <span>{user?.email}</span></button>
                </div>
            </div>
                )
            }
        </div>
    </div>
  )
}

export default AuthNavbar;