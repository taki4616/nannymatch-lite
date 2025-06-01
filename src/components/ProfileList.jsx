import React, { useState, useEffect } from "react";
import profiles from "../data/profiles";
import ProfileCard from "./ProfileCard";

function ProfileList() {
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [allProfiles, setAllProfiles] = useState([]);

  useEffect(() => {
    const userProfiles = JSON.parse(localStorage.getItem("userProfiles") || "[]");
    const combined = [...profiles, ...userProfiles];
    setAllProfiles(combined);
  }, []);

  const filteredProfiles = allProfiles.filter((profile) => {
    const roleMatch = !selectedRole || profile.role === selectedRole;
    const locationMatch = !selectedLocation || profile.location === selectedLocation;
    const availabilityMatch = !selectedAvailability || profile.availability === selectedAvailability;
    return roleMatch && locationMatch && availabilityMatch;
  });

  const familyProfiles = filteredProfiles.filter((p) => p.role === "Family");

  const handleClearFilters = () => {
    setSelectedRole("");
    setSelectedLocation("");
    setSelectedAvailability("");
  };

  return (
    <>
      <div className="filter-bar">
        <label>
          Role
          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            <option value="">All</option>
            <option value="Nanny">Nanny</option>
            <option value="Family">Family</option>
          </select>
        </label>

        <label>
          Location
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="">All</option>
            <option value="Brooklyn, NY">Brooklyn, NY</option>
            <option value="Harlem, NY">Harlem, NY</option>
            {/* Add more dynamically later if needed */}
          </select>
        </label>

        <label>
          Availability
          <select value={selectedAvailability} onChange={(e) => setSelectedAvailability(e.target.value)}>
            <option value="">All</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </label>

        <button className="clear-btn" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>

      {selectedRole !== "Nanny" && familyProfiles.length === 0 && (
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          No family profiles available to apply to. Try creating one!
        </p>
      )}

      <div className="card-grid">
        {filteredProfiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </>
  );
}

export default ProfileList;
