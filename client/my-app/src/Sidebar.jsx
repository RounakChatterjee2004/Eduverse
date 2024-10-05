import React from "react";
import "./Sidebar.css"; // Custom CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Top section: Menu links */}
      <div className="sidebar__section">
        <h3>Assessment</h3>
        <ul className="sidebar__list">
          <li>Dashboard</li>
          <li>Areas to Improve</li>
          <li>Overall Report</li>
          <li>Weak Areas</li>
          <li> Create -Assessment</li>
        </ul>
      </div>

      {/* AI-Based Assessments Section */}
      <div className="sidebar__section">
        <h3>AI-Based Assessments</h3>
        <ul className="sidebar__list">
          <li> Create Assessments using AI</li>
        </ul>
      </div>

      {/* User Section */}
      <div className="sidebar__user">
        <img
          src="https://via.placeholder.com/40" // Placeholder for user image
          alt="User"
          className="sidebar__user-img"
        />
        <div className="sidebar__user-info">
          <h4>John Smith</h4>
          <p>johnsmith@email.com</p>
        </div>
      </div>

      {/* Bottom section: Assessment and Sign Out */}
      <div className="sidebar__section">
        <ul className="sidebar__list">
          <li>Assessment</li>
          <li>Sign Out</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
