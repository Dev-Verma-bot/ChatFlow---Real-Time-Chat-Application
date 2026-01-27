import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const Verify_logged_in = () => {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default Verify_logged_in;
