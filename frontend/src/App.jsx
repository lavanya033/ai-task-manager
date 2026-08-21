import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Documents from "./pages/Documents";
import Search from "./pages/Search";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* Application Pages */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/users"
          element={<Users />}
        />

        <Route
          path="/tasks"
          element={<Tasks />}
        />

        <Route
          path="/documents"
          element={<Documents />}
        />

        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;