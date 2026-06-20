import { Link, Outlet } from "react-router-dom";

const StoriesPage = () => {
  return (
    <div className='w-full h-screen pt-[10vh]'>
      <div className="w-full h-full flex flex-col items-start overflow-y-scroll px-20 pt-20 gap-y-10">
        <h1 className="text-4xl font-bold">Stories</h1>
        <div className="w-full h-[5vh] flex justify-start items-center border-b py-5 gap-x-10">
          <Link to="">Drafts</Link>
          <Link to="published">Published</Link>
          <Link to="submissions">Submissions</Link>
        </div>
        <div className="w-full h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default StoriesPage
