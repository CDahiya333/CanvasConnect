// hooks/useKeycloakAuth.ts
import { useEffect, useState } from "react";
import keycloak from "../services/keycloak";

const useKeycloakAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const auth = await keycloak.init({
          onLoad: "login-required",
          checkLoginIframe: false, 
        });

        setIsAuthenticated(auth);
        setInitialized(true);
        console.log("🔐 Keycloak initialized:", auth);
      } catch (error) {
        console.error("❌ Failed to initialize Keycloak", error);
      }
    };

    initKeycloak();
  }, []);


  useEffect(() => {
    if (!initialized) return;

    const interval = setInterval(async () => {
      try {
        const refreshed = await keycloak.updateToken(1800);
        if (refreshed) {
          console.log("🔄 Token refreshed");
        } else {
          console.log("🕒 Token still valid");
        }
      } catch (err) {
        console.error("🚨 Failed to refresh token. Logging out...",err);
        keycloak.logout();
      }
    }, 100000); 

    return () => clearInterval(interval);
  }, [initialized]);

  return {
    keycloak,
    isAuthenticated,
    initialized,
    token: keycloak.token,
    userInfo: keycloak.tokenParsed,
  };
};

export default useKeycloakAuth;
