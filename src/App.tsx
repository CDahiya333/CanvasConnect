import "bootstrap/dist/css/bootstrap.min.css";
import Whiteboard from "./components/whiteboard";
import useKeyCloakAuth from "./hooks/useKeyCloakAuth";

const App = () => {
  const { initialized, isAuthenticated, userInfo, keycloak } = useKeyCloakAuth();

  if (!initialized) {
    return <div>KeyCloak Connection Failed...</div>;
  }

  if (!isAuthenticated) {
    return <div>Login Again</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">🚀 Welcome, {userInfo?.name}</h1>

      <div className="space-x-4">
        <button
          type="submit"
          onClick={() =>
            keycloak.logout({ redirectUri: window.location.origin })
          }
          className="bg-red-500 red text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          🔒 Logout
        </button>
        <Whiteboard />
      </div>
    </div>
  );
};

export default App;
