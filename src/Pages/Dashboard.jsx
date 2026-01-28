import ContactSidebar from "../Components/Common/ContactSidebar";
import Sidebar from "../Components/Common/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row overflow-hidden bg-[#05010a]">
      <Sidebar />

      {/* Container for Main Content + Contact Sidebar */}
      <div className="flex flex-1 flex-row overflow-hidden min-w-0">
        
        {/* MAIN: 60% on mobile, flex-1 on desktop */}
        <main className="flex-[0.6] md:flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 custom-scrollbar border-r border-white/5">
          <div className="mx-auto max-w-[1200px] w-full">
            <Outlet />
          </div>
        </main>

        {/* SIDEBAR WRAPPER: 40% on mobile, fixed width on desktop */}
        <div className="flex-[0.4] md:flex-none h-full overflow-hidden">
          <ContactSidebar />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;