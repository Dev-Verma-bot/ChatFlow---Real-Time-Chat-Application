import Sidebar from "../Components/Common/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-[#0B0E14] md:flex-row">
      
      <Sidebar />
      <main className="h-full flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8">
        <div className="mx-auto max-w-[1200px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;