import Sidebar from "./Sidebar";
import Questions from "./Questions.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <Routes>
          {/* Assuming you want to navigate to specific assessments */}
          <Route path="/" element={<Questions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
