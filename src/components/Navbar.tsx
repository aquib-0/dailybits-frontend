import { Link } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"

const Navbar = () => {
    // const {isAuthenticated} = useAuth();
  return (
    <div className="w-full h-[8vh] sm:h-[13vh] flex justify-between items-center px-4 sm:px-8 md:px-10 border-orange-200 border-b bg-transparent absolute top-0 z-20">
        <div className="font-bold text-2xl">
            <Link to="/" className="flex items-center gap-x-3"><span className="h-full border p-0 bg-black"><img src="/dailybits_white.svg" alt="" className="w-6" /></span> DailyBits</Link>
        </div>
        <div className="hidden h-full md:flex justify-center items-center gap-x-6">
            <Link to="/about" className="">Our Story</Link>
            <Link to="/membership" className="">Membership</Link>  {/*TO-DO -> implement this page for potential customers*/}
            <Link to="#" className="">Write</Link>  {/*Join this to the draft page of user after pipelining through auth*/}
            <Link to="/auth/login" className="">Sign-In</Link>
            <Link to="/auth/register" className="rounded-3xl px-4 py-2 bg-black text-white">Get Started</Link>
        </div>
        <div className="hidden sm:flex md:hidden justify-center items-center gap-x-6">
            {/*Hamburger menu goes here*/}
            <Link to="/auth/login" className="">Sign-In</Link>
            <Link to="/auth/register" className="rounded-3xl px-4 py-2 bg-black text-white">Get Started</Link>
        </div>
        <div className="sm:hidden">
            <Link to="/auth/register" className="rounded-3xl px-4 py-2 bg-black text-white">Get Started</Link>
        </div>
    </div>
  )
}

export default Navbar