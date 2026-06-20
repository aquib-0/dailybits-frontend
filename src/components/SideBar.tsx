import { Link, useLocation } from 'react-router-dom';

import { RiHome9Line } from "react-icons/ri";
import { RiHome9Fill } from "react-icons/ri";
import { BsBookmarks } from "react-icons/bs";
import { BsBookmarksFill } from "react-icons/bs";
import { RiUserLine } from "react-icons/ri";
import { RiUserFill } from "react-icons/ri";
import { BsFileText } from "react-icons/bs";
import { BsFileTextFill } from "react-icons/bs";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoStatsChart } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { PiUsersFill } from "react-icons/pi";

const SideBar = () => {
  const location = useLocation();
  return (
    
        <div className="border-r w-62.5 h-[90vh] mt-[10vh] px-6 py-20 flex md:flex flex-col gap-y-5 absolute md:relative bg-white">  {/*w-[250px]*/}
          <Link to="/home" className="sidebar-links gap-x-4"><span>{location.pathname === "/home"? (<RiHome9Fill size={24} />): (<RiHome9Line size={24} />)}</span>Home</Link>
          <Link to="/library" className="sidebar-links gap-x-4"><span>{location.pathname.startsWith("/library")? (<BsBookmarksFill size={24} />) : (<BsBookmarks size={24} />)}</span>Library</Link>
          <Link to="profile" className="sidebar-links gap-x-4"><span>{location.pathname === "/profile"? (<RiUserFill size={24} />) : (<RiUserLine size={24} />)}</span>Profile</Link>
          <Link to="stories" className="sidebar-links gap-x-4"><span>{location.pathname.startsWith("/stories")? (<BsFileTextFill size={24} />) : (<BsFileText size={24} />)}</span>Stories</Link>
          <Link to="/stats" className="sidebar-links gap-x-4"><span>{location.pathname === "/stats"? (<IoStatsChart size={24} />) : (<IoStatsChartOutline size={24} />)}</span>Stats</Link>
          <hr />
          <Link to="/following" className="sidebar-links gap-x-4"><span>{location.pathname === "/following"? (<PiUsersFill size={24} />) : (<PiUsers size={24} />)}</span>Following</Link>
        </div> 
  )
}

export default SideBar
