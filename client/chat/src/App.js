import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthWrapper from "./components/AuthWrapper";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          path="/"
        />
        <Route
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          path="/:id"
        />
        <Route
          element={
            <AuthWrapper>
              <Login />
            </AuthWrapper>
          }
          path="/login"
        />
        <Route
          element={
            <AuthWrapper>
              <Register />
            </AuthWrapper>
          }
          path="/register"
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
