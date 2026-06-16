import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
import LibraryPage from "./pages/LibraryPage";
import ProfilePage from "./pages/ProfilePage";
import StoriesPage from "./pages/StoriesPage";
import StatsPage from "./pages/StatsPage";

function App() {

  return (
    
    <div className='max-w-screen'>
      <nav>
        <Navbar />
      </nav>
      <main className="w-full h-screen border">
        <Routes>
          <Route path="/" element={<LandingPage />} />  {/*Contains Landing page - Introduction to the platform and sign-up links*/}
          <Route path="/home" element={<HomePage />} />     {/*Contains For-you page - all the content is pulled here to be consumed*/}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth/login" element={<AuthPage />} />
          <Route path="/auth/register" element={<AuthPage />} />
          <Route path="/library" element={<LibraryPage />} />  {/*Contains sub-pages - your posts, your saved posts, your reading history, and responses to your comments*/}
          <Route path="/profile" element={<ProfilePage />} />  {/*Contains sub-pages - reading lists, your activity, and about yourself*/}
          <Route path="/stories" element={<StoriesPage />} />  {/*Contains sub-pages - drafts for stories you have already started, published stories, your submissions*/}
          <Route path="/stats" element={<StatsPage />} />  {/*Contains statistical data about your follower counts, subscribers, views and reads story-wise*/}
        </Routes>
      </main>
      <footer className="w-full h-[10vh] flex justify-center items-center border">
        This is the footer of the website.
      </footer>
    </div>
  )
}

export default App
