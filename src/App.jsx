import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/General/Home";
import About from "./pages/General/About";
import Pricing from "./pages/General/Pricing";
import Login from "./pages/General/Login";
import Register from "./pages/General/Register";
import Chat from "./pages/private/Chat";
import Connection from "./pages/private/ConnectionPage";


import MatrimonyFilter from "./components/connection/MatrimonyFilter"

// Profile Nested
import ProfileLayout from "./pages/private/ProfileLayout";
import ProfilePreview from "./components/ProfileStruc/Profile/ProfilePreview";
import ProfileEditForm from "./components/ProfileStruc/Profile/ProfileEditForm";

// Layouts
import PublicLayout from "./components/layouts/PublicLayout";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Public Layout */}
        <Route element={<PublicLayout />}>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/MatrimonyFilter" element={<MatrimonyFilter />} />
        

          {/* Private Pages */}
          <Route
            path="/connection"
            element={
              <ProtectedRoute>
                <Connection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />


          {/* Profile Nested Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileLayout />
              </ProtectedRoute>
            }
          >
            {/* CHANGE: Added ":id?" to make the ID optional.
    - /profile will show your own profile.
    - /profile/12345 will show that specific user's profile.
  */}
            <Route path=":id?" element={<ProfilePreview />} />

            {/* Edit Profile (Remains the same) */}
            <Route path="edit" element={<ProfileEditForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
