
import { Routes,Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Navbar from "./Components/Common/Navbar";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import OTPPage from "./Pages/Otp_enter_page";
const App= ()=> {
  return (
    <div className=" bg-black text-white">
      <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/login" element= {<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/otp-verify" element={<OTPPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
