import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AutoLoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return null;
};

export default AutoLoginPage;
