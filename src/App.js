
import { Routes,Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Navbar from "./Components/Common/Navbar";
const App= ()=> {
  return (
    <div className=" bg-black text-white">
      <Navbar/>
    <Routes>
      <Route path="/" element={<Homepage/>} />
    </Routes>
    </div>
  );
}

export default App;
