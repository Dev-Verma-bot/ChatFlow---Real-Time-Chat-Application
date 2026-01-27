import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Navbar from "./Components/Common/Navbar";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import OTPPage from "./Pages/Otp_enter_page";
import Verify_logged_in from "./Auth/Verify_logged_in";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
const App = () => {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <Routes>
        
        <Route element={<Verify_logged_in />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/otp-verify" element={<OTPPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/profile" element={<Profile />} />  */}
      </Route>
      </Routes>
    </div>
  );
};

export default App;
