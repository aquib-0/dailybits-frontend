import { Route, Routes } from "react-router-dom"
import "./App.css"

import Navbar from "./components/Navbar";
import AuthNavbar from "./components/AuthNavbar";
import SideBar from "./components/SideBar";
import LandingPage from "./pages/unprotectedPages/LandingPage";
import HomePage from "./pages/homePages/HomePage";
import ForYouPage from "./pages/homePages/ForYouPage";
import FeaturedPage from "./pages/homePages/FeaturedPage";
import AboutPage from "./pages/unprotectedPages/AboutPage";
import AuthPage from "./pages/unprotectedPages/AuthPage";
import LibraryPage from "./pages/LibraryPage";
import ProfilePage from "./pages/profilePages/ProfilePage";
import IndividualProfileLayout from "./pages/profilePages/IndividualProfileLayout";
import RepostsPage from "./pages/profilePages/RepostsPage";
import ActivityPage from "./pages/profilePages/ActivityPage";
import ProfileAboutPage from "./pages/profilePages/ProfileAboutPage";
import StoriesPage from "./pages/storiesPages/StoriesPage";
import DraftsPage from "./pages/storiesPages/DraftsPage";
import WriteStoryPage from "./pages/storiesPages/WriteStoryPage";
import ReadStoryPage from "./pages/storiesPages/ReadStoryPage";
import PublishedPage from "./pages/storiesPages/PublishedPage";
import SubmissionsPage from "./pages/storiesPages/SubmissionsPage";
import StatsPage from "./pages/StatsPage";
import FollowingPage from "./pages/FollowingPage";
import Footer from "./components/Footer";

import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  const {isAuthenticated} = useAuth();

  return (
    
    <div className='min-w-screen flex flex-col relative'>
      <nav>
        {
          isAuthenticated? (<AuthNavbar />) : (<Navbar />)
        }
      </nav>
      <div className="w-full flex overflow-hidden">
        {
          isAuthenticated && (
            <SideBar />
          )
        }
        <main className="w-[60%] flex grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />  {/*Contains Landing page - Introduction to the platform and sign-up links*/}
            {/* <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />     Contains For-you page - all the content is pulled here to be consumed */}
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>}>
              <Route path="" element={<ForYouPage />} />
              <Route path="featured" element={<FeaturedPage />} />
            </Route>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth/login" element={<AuthPage />} />
            <Route path="/auth/register" element={<AuthPage />} />
            <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />  {/*Contains sub-pages - your posts, your saved posts, your reading history, and responses to your comments*/}
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}>  {/*Contains sub-pages - reading lists, your activity, and about yourself*/}
              <Route path="" element={<IndividualProfileLayout />} />
              <Route path="reposts" element={<RepostsPage />} />
              <Route path="activity" element={<ActivityPage />} />
              <Route path="about" element={<ProfileAboutPage />} />
            </Route>
            {/* <Route path="/stories" element={<ProtectedRoute><StoriesPage /></ProtectedRoute>} />  Contains sub-pages - drafts for stories you have already started, published stories, your submissions */}
            <Route path="/stories" element={<ProtectedRoute><StoriesPage /></ProtectedRoute>}>
              <Route path="" element={<DraftsPage />} />
              {/* <Route path="write" element={<WriteStoryPage />} /> */}
              <Route path="published" element={<PublishedPage />} />
              <Route path="submissions" element={<SubmissionsPage />} />
            </Route>
            {/* <Route path="/stories/write" element={<WriteStoryPage />}>
              
              
            </Route> */}
            <Route path="/stories/write" element={<WriteStoryPage />} />
            <Route path="/stories/write/:id" element={<WriteStoryPage />} />
            <Route path="/stories/read" element={<ReadStoryPage />} />
            {/* <Route path="/stories/write/:id" element={<DynamicWrite />} /> */}
            {/* <Route path="/stories/published" element={<ProtectedRoute><PublishedPage /></ProtectedRoute>} /> */}
            <Route path="/stats" element={<ProtectedRoute><StatsPage /></ProtectedRoute>} />  {/*Contains statistical data about your follower counts, subscribers, views and reads story-wise*/}
            <Route path="/following" element={<ProtectedRoute><FollowingPage /></ProtectedRoute>} />
          </Routes>
        </main>
        
      </div>
      {
        !isAuthenticated && (
        <footer className="w-full h-[10vh]">
          <Footer />
        </footer>
        )
      }
    </div>
  )
}

export default App


// import { Route, Routes } from "react-router-dom"
// import "./App.css"

// import Navbar from "./components/Navbar";
// import AuthNavbar from "./components/AuthNavbar";
// import SideBar from "./components/SideBar";
// import LandingPage from "./pages/unprotectedPages/LandingPage";
// import HomePage from "./pages/homePages/HomePage";
// import ForYouPage from "./pages/homePages/ForYouPage";
// import FeaturedPage from "./pages/homePages/FeaturedPage";
// import AboutPage from "./pages/unprotectedPages/AboutPage";
// import AuthPage from "./pages/unprotectedPages/AuthPage";
// import LibraryPage from "./pages/LibraryPage";
// import ProfilePage from "./pages/profilePages/ProfilePage";
// import IndividualProfileLayout from "./pages/profilePages/IndividualProfileLayout";
// import RepostsPage from "./pages/profilePages/RepostsPage";
// import ActivityPage from "./pages/profilePages/ActivityPage";
// import ProfileAboutPage from "./pages/profilePages/ProfileAboutPage";
// import StoriesPage from "./pages/storiesPages/StoriesPage";
// import DraftsPage from "./pages/storiesPages/DraftsPage";
// import WriteStoryPage from "./pages/storiesPages/WriteStoryPage";
// import ReadStoryPage from "./pages/storiesPages/ReadStoryPage";
// import PublishedPage from "./pages/storiesPages/PublishedPage";
// import SubmissionsPage from "./pages/storiesPages/SubmissionsPage";
// import StatsPage from "./pages/StatsPage";
// import FollowingPage from "./pages/FollowingPage";
// import Footer from "./components/Footer";

// import { useAuth } from "./context/AuthContext";
// import { useSidebar } from "./context/SidebarContext"; // 1. Import your Sidebar state provider here
// import ProtectedRoute from "./routes/ProtectedRoutes";

// function App() {
//   const { isAuthenticated } = useAuth();
//   const { open } = useSidebar() as { open: boolean }; // 2. Consume the context inside the parent container

//   return (
//     <div className='min-h-screen flex flex-col relative'>
//       <nav className="h-[10vh] fixed top-0 left-0 right-0 z-30">
//         {isAuthenticated ? <AuthNavbar /> : <Navbar />}
//       </nav>

//       {/* 
//         3. Dynamic Grid Container
//         On desktop frames, the first column tracks the Sidebar's width (250px or 0px), 
//         the center expands fluidly (1fr), and the right sidebar remains fixed.
//       */}
//       <div 
//         className={`
//           w-full min-h-[90vh] overflow-hidden grid grid-cols-1
//           transition-all duration-300 ease-in-out
//           ${isAuthenticated 
//             ? open 
//               ? 'md:grid-cols-[250px_1fr_350px]' 
//               : 'md:grid-cols-[0px_1fr_350px]'
//             : 'grid-cols-1'
//           }
//         `}
//       >
//         {isAuthenticated && <SideBar />}

//         {/* 4. Main content track expands automatically via 1fr configuration */}
//         <main className="w-full flex flex-col p-6">
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
//             <Route path="/home" element={<HomePage />}>
//               <Route path="" element={<ForYouPage />} />
//               <Route path="featured" element={<FeaturedPage />} />
//             </Route>
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="/auth/login" element={<AuthPage />} />
//             <Route path="/auth/register" element={<AuthPage />} />
//             <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
//             <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}>
//               <Route path="" element={<IndividualProfileLayout />} />
//               <Route path="reposts" element={<RepostsPage />} />
//               <Route path="activity" element={<ActivityPage />} />
//               <Route path="about" element={<ProfileAboutPage />} />
//             </Route>
//             <Route path="/stories" element={<ProtectedRoute><StoriesPage /></ProtectedRoute>}>
//               <Route path="" element={<DraftsPage />} />
//               <Route path="published" element={<PublishedPage />} />
//               <Route path="submissions" element={<SubmissionsPage />} />
//             </Route>
//             <Route path="/stories/write" element={<WriteStoryPage />} />
//             <Route path="/stories/write/:id" element={<WriteStoryPage />} />
//             <Route path="/stories/read" element={<ReadStoryPage />} />
//             <Route path="/stats" element={<ProtectedRoute><StatsPage /></ProtectedRoute>} />
//             <Route path="/following" element={<ProtectedRoute><FollowingPage /></ProtectedRoute>} />
//           </Routes>
//         </main>

//         {isAuthenticated && (
//           <div className="h-[90vh] sticky top-[10vh] hidden md:flex justify-center items-center border-gray-300 border-l p-4">
//             Staff picks for you
//           </div>
//         )}
//       </div>

//       {!isAuthenticated && (
//         <footer className="w-full h-[10vh]">
//           <Footer />
//         </footer>
//       )}
//     </div>
//   )
// }

// export default App