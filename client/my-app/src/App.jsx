import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx"; // Import your login component

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />

        {/* Default Home route (this can be anything you want) */}
        <Route
          path="/"
          element={
            <div className="text-center bg-blue-500 text-white py-10">
              <h1 className="text-3xl font-bold">Hello, Tailwind CSS!</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
