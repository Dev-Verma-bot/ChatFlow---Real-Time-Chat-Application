import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Auth & Layouts
import Navbar from "./Components/Common/Navbar";
import Verify_logged_in from "./Auth/Verify_logged_in";
import ProtectedRoute from "./Auth/ProtectedRoute";

// Pages
import Homepage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import OTPPage from "./Pages/Otp_enter_page";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Components/Core/Dashboard/Profile";
import DashboardHome from "./Components/Core/Dashboard/DashboardHome";
const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <div className="bg-black text-white min-h-screen">
  
      {!token && <Navbar />}

      <Routes>
        <Route element={<Verify_logged_in />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/otp-verify" element={<OTPPage />} />
        </Route>

        {/* The user goes to /dashboard/profile.
        ProtectedRoute runs first. It sees the token and renders its child: Dashboard.
        Dashboard runs second. It renders the Sidebar and sees that
       the sub-path is profile, so it renders Profile inside its <Outlet />. */}
         
         {/* if using children means passing children we need to each time check 
         means wrap element inside the protectedRoute by using outlet once 
         defined it alawys first check the parent then execute the childrens  */}
         <Route element={<ProtectedRoute />}>
          
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            
            <Route path="profile" element={<Profile />} />
          </Route>


        </Route>

        <Route path="*" element={<div className="p-20 text-center">404 - Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;