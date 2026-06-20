import { Link } from 'react-router-dom'
import { useState } from 'react';

import { useAuth } from '../context/AuthContext';

import { LiaEditSolid } from "react-icons/lia";
import { PiBellThin } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";


const AuthNavbar = () => {
    const {logout} = useAuth();
    const [profileOpen, setProfileOpen] = useState(false);
    const [hamburgerOpen, setHamburgerOpen] = useState(true);

  return (
    <div className='w-full h-[10vh] flex justify-between items-center px-0 sm:px-8 md:px-12 border bg-white absolute top-0'>
        <div className="font-bold text-2xl italic flex items-center gap-x-5">
            {/*Hamburger menu - side menu icon*/}
            <div className='hover:cursor-pointer'>
                <RxHamburgerMenu size={24} onClick={()=>{setHamburgerOpen(!hamburgerOpen);}} />
            </div>
            <Link to="/" className="">NameOfBlog</Link>
            <input type="search" id="search" placeholder="Search..." />
        </div>

        <div className="hidden h-full md:flex justify-center items-center gap-x-6">
            <Link to='#' className='flex items-center'><LiaEditSolid size={24} />Write</Link>
            <Link to='#'><PiBellThin size={24} /></Link>
            <div onClick={()=> {setProfileOpen(!profileOpen);}} className='w-[30px] h-[30px] rounded-full border relative hover:cursor-pointer'>
                <img src="#" alt="P" className='w-full h-full rounded-full' />
                {
                    profileOpen && (
                        <div className='w-[20vw] h-[40vh] flex flex-col items-center justify-center absolute top-8 right-0 border bg-orange-100'>
                            <button onClick={()=>{logout();}} className='px-6 py-1 rounded-3xl bg-black text-white'>Logout</button>
                        </div>
                    )
                }
            </div>

        </div>
        <div className="hidden sm:flex md:hidden justify-center items-center gap-x-6">
            {/*Hamburger menu goes here*/}
            <Link to="/auth/login" className="">Sign-In</Link>
            <Link to="/auth/register" className="rounded-3xl px-4 py-2 bg-black text-white">Get Started</Link>
        </div>
    </div>
  )
}

export default AuthNavbar;
// export {hamburgerOpen, setHamburgerOpen};