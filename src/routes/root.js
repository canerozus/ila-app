import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import Header from "../components/header";
import { useEffect } from "react";

function ProtectedRoute() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();
  const { formData, setFormData } = useUserContext();
  const location = useLocation();

  useEffect(() => {
    if (user && formData.userId !== user.sub) {
      localStorage.removeItem("formData");
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        summary: "",
        cv: null,
        registered: false,
        userId: "",
      });
      navigate("/register");
    }
  }, [isAuthenticated, user, formData.userId]);

  return isLoading ? (
    <div className="text-center">Loading...</div>
  ) : !isAuthenticated ? (
    <Navigate to="/login" />
  ) : formData.registered === false && location.pathname !== "/register" ? (
    <Navigate to="/register" />
  ) : (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default ProtectedRoute;
