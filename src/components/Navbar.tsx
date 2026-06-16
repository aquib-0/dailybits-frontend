import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="w-full h-[13vh] flex justify-between items-center px-16 border">
        <div className="font-bold text-2xl italic">
            <Link to="/" className="">NameOfBlog</Link>
        </div>
        <div className="h-full flex justify-center items-center gap-x-6">
            <Link to="/about" className="">Our Story</Link>
            <Link to="/membership" className="">Membership</Link>  {/*TO-DO -> implement this page for potential customers*/}
            <Link to="#" className="">Write</Link>  {/*Join this to the draft page of user after pipelining through auth*/}
            <Link to="/auth/login" className="">Sign-In</Link>
            <Link to="/auth/register" className="border rounded-3xl px-4 py-2 bg-black text-white">Get Started</Link>
        </div>
        <div>
            {/*Hamburger menu goes here*/}
        </div>
    </div>
  )
}

export default Navbar