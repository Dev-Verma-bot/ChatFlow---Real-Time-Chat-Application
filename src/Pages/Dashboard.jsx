import ContactSidebar from "../Components/Common/ContactSidebar";
import Sidebar from "../Components/Common/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row overflow-hidden bg-[#05010a]">
      <Sidebar />

      <div className="flex flex-1 flex-row overflow-hidden min-w-0">
        
        <main className="flex-[0.6] md:flex-1 overflow-hidden border-r border-white/5">
          <div className="h-full w-full">
            <Outlet />
          </div>
        </main>

        <div className="flex-[0.4] md:flex-none h-full overflow-hidden">
          <ContactSidebar />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;