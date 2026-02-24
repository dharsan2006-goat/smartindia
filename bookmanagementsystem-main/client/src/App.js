// ...existing code...
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Books from "./pages/Books/Books";
import AddBook from "./pages/Books/AddBook";
import EditBook from "./pages/Books/EditBook";
import BookUpload from "./pages/Books/BookUpload";

// CSS
import "./App.css";

// Layout to control Navbar
function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isAuth = !!localStorage.getItem("user");

  return (
    <>
      {!isLoginPage && <Navbar />}

      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to={isAuth ? "/home" : "/login"} />} />

        {/* Protected Pages */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addBook"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        />

        <Route
          path="/uploadBook"
          element={
            <ProtectedRoute>
              <BookUpload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books/editBook/:id"
          element={
            <ProtectedRoute>
              <EditBook />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
// ...existing code...