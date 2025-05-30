import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import ProfileList from "./components/ProfileList";
import InterestedList from "./components/InterestedList";
import CreateProfile from "./components/CreateProfile";
import NotFound from "./components/NotFound";
import AdminDashboard from "./components/AdminDashboard";
import MessageThread from './components/MessageThread';
import FamilyDashboard from "./components/FamilyDashboard";
import Inbox from "./components/Inbox";

function App() {
  return (
    <Router>
      <div className="app">
        <h1>NannyMatch Lite</h1>
        
        <nav className="nav-bar">
          <Link to="/">All Profiles</Link>
          <Link to="/interested">Saved Profiles</Link>
          <Link to="/create">Create Profile</Link>
          <Link to="/inbox">Inbox</Link> {/* 👈 Add this line */}
        </nav>

        <Routes>
          <Route path="/" element={<ProfileList />} />
          <Route path="/interested" element={<InterestedList />} />
          <Route path="/create" element={<CreateProfile />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/family-dashboard" element={<FamilyDashboard />} />
          <Route path="/messages/:familyId" element={<MessageThread />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
