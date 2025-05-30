import React, { useState, useEffect } from "react";
import profiles from "../data/profiles";
import ProfileCard from "./ProfileCard";
import FilterBar from "./FilterBar";

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


  return (
    <>
      <FilterBar
        selectedRole={selectedRole}
        selectedLocation={selectedLocation}
        selectedAvailability={selectedAvailability}
        onRoleChange={setSelectedRole}
        onLocationChange={setSelectedLocation}
        onAvailabilityChange={setSelectedAvailability}
      />
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
