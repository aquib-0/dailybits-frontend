import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className='w-full  h-screen flex justify-start sm:justify-center items-center bg-orange-100'>
      <div className="w-full sm:w-[60%] h-full flex flex-col justify-center items-start sm:pl-10 gap-y-10">
        <div className="text-5xl md:text-7xl font-medium">
          <h1>Storytelling</h1>
          <h1>& ideas</h1>
        </div>
        <p className="text-xl">A place to read, write and deepen your understanding.</p>
        <Link to='/home' className="rounded-3xl px-6 py-2 sm:bg-black bg-green-700 text-orange-100 sm:text-white">Start reading</Link>
      </div>
      <div className="hidden sm:block bg-[url(https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png)] w-[40%] h-full bg-cover bg-no-repeat">
      </div>
    </div>
  )
}

export default LandingPage
