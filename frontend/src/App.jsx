import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllTopic from "./pages/AllTopic";
import AddTopic from "./pages/AddTopic";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notification from "./pages/Notification";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/signup" replace />;
};

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="mx-4 sm:mx-[10%]">
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* ROOT */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/signup" replace />
            )
          }
        />

        {/* PUBLIC ROUTES */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/all-topics"
          element={
            <ProtectedRoute>
              <AllTopic />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-topic"
          element={
            <ProtectedRoute>
              <AddTopic />
            </ProtectedRoute>
          }
        />

        <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notification />
          </ProtectedRoute>
        }
      />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
