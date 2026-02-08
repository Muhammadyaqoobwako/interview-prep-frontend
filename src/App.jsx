// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Home/Dashboard";
import InterviewPrep from "./Pages/InterviewPrep/InterviewPrep";
import UserProvider from "./Context/userContext";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/interview-prep/:sessionId"
            element={<InterviewPrep />}
          />
        </Routes>

        {/* Global Toaster for notifications */}
        <Toaster
          toastOptions={{
            className: "react-hot-toast",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </UserProvider>
    </Router>
  );
};

export default App;
