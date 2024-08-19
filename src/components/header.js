import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const Header = () => {
  const { logout } = useAuth0();
  const { formData } = useUserContext();

  const formatName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <header style={{ backgroundColor: "#008d8a", padding: "10px" }}>
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 style={{ color: "#fff", margin: 0 }}>ILA App</h1>
        </Link>
        <div className="d-flex align-items-center">
          <p className="mb-0 me-3 text-white">
            {formatName(formData.firstName)}
          </p>
          <button className="btn btn-light" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
