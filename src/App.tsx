import { Route, Routes } from "react-router-dom"
import "./App.css"

import Navbar from "./components/Navbar";
import AuthNavbar from "./components/AuthNavbar";
import SideBar from "./components/SideBar";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
import LibraryPage from "./pages/LibraryPage";
import ProfilePage from "./pages/ProfilePage";
import StoriesPage from "./pages/StoriesPage";
import DraftsPage from "./pages/DraftsPage";
import PublishedPage from "./pages/PublishedPage";
import SubmissionsPage from "./pages/SubmissionsPage";
import StatsPage from "./pages/StatsPage";
import FollowingPage from "./pages/FollowingPage";
import Footer from "./components/Footer";

import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  const {isAuthenticated} = useAuth();

  return (
    
    <div className='max-w-screen flex flex-col relative'>
      <nav>
        {
          isAuthenticated? (<AuthNavbar />) : (<Navbar />)
        }
        {/* <AuthNavbar /> */}
      </nav>
      <div className="flex overflow-hidden w-full">
        {
          isAuthenticated && (
            <SideBar />
          )
        }
        <main className="w-full h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />  {/*Contains Landing page - Introduction to the platform and sign-up links*/}
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />     {/*Contains For-you page - all the content is pulled here to be consumed*/}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth/login" element={<AuthPage />} />
            <Route path="/auth/register" element={<AuthPage />} />
            <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />  {/*Contains sub-pages - your posts, your saved posts, your reading history, and responses to your comments*/}
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />  {/*Contains sub-pages - reading lists, your activity, and about yourself*/}
            {/* <Route path="/stories" element={<ProtectedRoute><StoriesPage /></ProtectedRoute>} />  Contains sub-pages - drafts for stories you have already started, published stories, your submissions */}
            <Route path="/stories" element={<ProtectedRoute><StoriesPage /></ProtectedRoute>}>
              <Route path="" element={<DraftsPage />} />
              <Route path="published" element={<PublishedPage />} />
              <Route path="submissions" element={<SubmissionsPage />} />
            </Route>
            {/* <Route path="/stories/published" element={<ProtectedRoute><PublishedPage /></ProtectedRoute>} /> */}
            <Route path="/stats" element={<ProtectedRoute><StatsPage /></ProtectedRoute>} />  {/*Contains statistical data about your follower counts, subscribers, views and reads story-wise*/}
            <Route path="/following" element={<ProtectedRoute><FollowingPage /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
      {/* <footer className="w-full h-[10vh]">
        <Footer />
      </footer> */}
    </div>
  )
}

export default App
