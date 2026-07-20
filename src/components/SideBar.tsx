// import { Link, useLocation } from 'react-router-dom';
// import { useSidebar } from '../context/SidebarContext';
// import { RiHome9Line } from "react-icons/ri";
// import { RiHome9Fill } from "react-icons/ri";
// import { BsBookmarks } from "react-icons/bs";
// import { BsBookmarksFill } from "react-icons/bs";
// import { RiUserLine } from "react-icons/ri";
// import { RiUserFill } from "react-icons/ri";
// import { BsFileText } from "react-icons/bs";
// import { BsFileTextFill } from "react-icons/bs";
// import { IoStatsChartOutline } from "react-icons/io5";
// import { IoStatsChart } from "react-icons/io5";
// import { PiUsers } from "react-icons/pi";
// import { PiUsersFill } from "react-icons/pi";

// const SideBar = () => {
//   const location = useLocation();
//   const {open} = useSidebar();
//   return (
    
//       open? (
//         <div className="w-62.5 h-[90vh] flex md:flex flex-col mt-[10vh] px-2 py-10 gap-y-3 text-gray-500 border-r absolute left-0 md:relative bg-white z-20">  {/*w-[250px]*/}
//           <Link to="home" className={`flex items-center justify-start px-6 py-1 gap-x-4 hover:text-gray-700 ${location.pathname.startsWith("/home")? "border-l-2 text-black" : ""}`}><span>{location.pathname.startsWith("/home")? (<RiHome9Fill size={24} />): (<RiHome9Line size={24} />)}</span>Home</Link>
//           <Link to="library" className={`flex items-center justify-start px-6 py-1 gap-x-4 hover:text-gray-700 ${location.pathname.startsWith("/library")? "border-l-2 text-black" : ""}`}><span>{location.pathname.startsWith("/library")? (<BsBookmarksFill size={24} />) : (<BsBookmarks size={24} />)}</span>Library</Link>
//           <Link to="profile" className={`flex items-center justify-start px-6 py-1 gap-x-4 hover:text-gray-700 ${location.pathname.startsWith("/profile")? "border-l-2 text-black" : ""}`}><span>{location.pathname.startsWith("/profile")? (<RiUserFill size={24} />) : (<RiUserLine size={24} />)}</span>Profile</Link>
//           <Link to="stories" className={`flex items-center justify-start px-6 py-1 gap-x-4 hover:text-gray-700 ${location.pathname.startsWith("/stories")? "border-l-2 text-black" : ""}`}><span>{location.pathname.startsWith("/stories")? (<BsFileTextFill size={24} />) : (<BsFileText size={24} />)}</span>Stories</Link>
//           <Link to="stats" className={`flex items-center justify-start px-6 py-1 gap-x-4 hover:text-gray-700 ${location.pathname.startsWith("/stats")? "border-l-2 text-black" : ""}`}><span>{location.pathname === "/stats"? (<IoStatsChart size={24} />) : (<IoStatsChartOutline size={24} />)}</span>Stats</Link>
//           <hr className='my-5 text-gray-300' />
//           <Link to="following" className={`flex items-center justify-start px-6 py-1 gap-x-4 hover:text-gray-700 ${location.pathname.startsWith("/following")? "border-l-2 text-black" : ""}`}><span>{location.pathname === "/following"? (<PiUsersFill size={24} />) : (<PiUsers size={24} />)}</span>Following</Link>
//         </div>
//       )
//       : (
//         <div className="w-62.5 h-[90vh] flex md:flex flex-col mt-[10vh] px-2 py-10 gap-y-3 text-gray-500 border-r absolute md:-left-[250px] bg-white z-20">  {/*w-[250px]*/}
//           <Link to="home" className={`flex items-center justify-start px-6 py-1 gap-x-4 hover:text-gray-700 ${location.pathname.startsWith("/home")? "border-l-2 text-black" : ""}`}><span>{location.pathname.startsWith("/home")? (<RiHome9Fill size={24} />): (<RiHome9Line size={24} />)}</span>Home</Link>
//           <Link to="library" className={`flex items-center justify-start px-6 py-1 gap-x-4 hover:text-gray-700 ${location.pathname.startsWith("/library")? "border-l-2 text-black" : ""}`}><span>{location.pathname.startsWith("/library")? (<BsBookmarksFill size={24} />) : (<BsBookmarks size={24} />)}</span>Library</Link>
//           <Link to="profile" className={`flex items-center justify-start px-6 py-1 gap-x-4 hover:text-gray-700 ${location.pathname.startsWith("/profile")? "border-l-2 text-black" : ""}`}><span>{location.pathname.startsWith("/profile")? (<RiUserFill size={24} />) : (<RiUserLine size={24} />)}</span>Profile</Link>
//           <Link to="stories" className={`flex items-center justify-start px-6 py-1 gap-x-4 hover:text-gray-700 ${location.pathname.startsWith("/stories")? "border-l-2 text-black" : ""}`}><span>{location.pathname.startsWith("/stories")? (<BsFileTextFill size={24} />) : (<BsFileText size={24} />)}</span>Stories</Link>
//           <Link to="stats" className={`flex items-center justify-start px-6 py-1 gap-x-4 hover:text-gray-700 ${location.pathname.startsWith("/stats")? "border-l-2 text-black" : ""}`}><span>{location.pathname === "/stats"? (<IoStatsChart size={24} />) : (<IoStatsChartOutline size={24} />)}</span>Stats</Link>
//           <hr className='my-5 text-gray-300' />
//           <Link to="following" className={`flex items-center justify-start px-6 py-1 gap-x-4 hover:text-gray-700 ${location.pathname.startsWith("/following")? "border-l-2 text-black" : ""}`}><span>{location.pathname === "/following"? (<PiUsersFill size={24} />) : (<PiUsers size={24} />)}</span>Following</Link>
//         </div>
//       )
    
//   )
// }

// export default SideBar


// import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import type { IconType } from 'react-icons';
import { RiHome9Line, RiHome9Fill, RiUserLine, RiUserFill } from "react-icons/ri";
import { BsBookmarks, BsBookmarksFill, BsFileText, BsFileTextFill } from "react-icons/bs";
import { IoStatsChartOutline, IoStatsChart } from "react-icons/io5";
import { PiUsers, PiUsersFill } from "react-icons/pi";

interface NavLinkItem {
  to: string;
  label: string;
  ActiveIcon: IconType;
  InactiveIcon: IconType;
  exact: boolean;
  isDivider?: false;
}

interface NavDividerItem {
  isDivider: true;
}

type NavItem = NavLinkItem | NavDividerItem;

const NAV_ITEMS: NavItem[] = [
  { to: "home", label: "Home", ActiveIcon: RiHome9Fill, InactiveIcon: RiHome9Line, exact: false },
  { to: "library", label: "Library", ActiveIcon: BsBookmarksFill, InactiveIcon: BsBookmarks, exact: false },
  { to: "profile", label: "Profile", ActiveIcon: RiUserFill, InactiveIcon: RiUserLine, exact: false },
  { to: "stories", label: "Stories", ActiveIcon: BsFileTextFill, InactiveIcon: BsFileText, exact: false },
  { to: "stats", label: "Stats", ActiveIcon: IoStatsChart, InactiveIcon: IoStatsChartOutline, exact: true },
  { isDivider: true },
  { to: "following", label: "Following", ActiveIcon: PiUsersFill, InactiveIcon: PiUsers, exact: true },
];

const SideBar = () => {
  const location = useLocation();
  const { open } = useSidebar(); 

  return (
    <div
      className={`
        w-62.5 h-[90vh] px-2 py-10 flex flex-col gap-y-3
        bg-white text-gray-500 border-r z-20 overflow-x-hidden
        fixed top-[10vh] left-0
        
        transition-all duration-300 ease-in-out
        ${open 
          ? "translate-x-0 md:sticky" /*opacity-100 visible*/ 
          : "-translate-x-full" /*opacity-0 invisible md:opacity-100 md:visible*/
        }
      `}
    >  {/*w-[250px]*/}
      {NAV_ITEMS.map((item, index) => {
        if (item.isDivider) {
          return <hr key={`divider-${index}`} className="my-5 text-gray-300" />;
        }

        const isActive = item.exact 
          ? location.pathname === `/${item.to}`
          : location.pathname.startsWith(`/${item.to}`);

        const Icon = isActive ? item.ActiveIcon : item.InactiveIcon;

        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center justify-start px-6 py-1 gap-x-4 hover:text-gray-700 transition-colors ${
              isActive ? "border-l-2 border-black text-black" : ""
            }`}
          >
            <span><Icon size={24} /></span>
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default SideBar;