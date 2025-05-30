import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    role: "Nanny",
    location: "",
    experience: "",
    rate: "",
    availability: "Full-time",
    bio: "",
    image: ""
  });

  const [previewProfile, setPreviewProfile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreview = () => {
    const DEFAULT_IMAGE = "https://via.placeholder.com/150";

    if (!formData.name || !formData.location || !formData.rate || !formData.bio) {
      alert("Please fill out the required fields to preview.");
      return;
    }

    const previewData = {
      ...formData,
      image: formData.image || DEFAULT_IMAGE,
      id: Date.now()
    };

    setPreviewProfile(previewData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.rate || !formData.bio) {
      alert("Please fill out all required fields.");
      return;
    }

    const DEFAULT_IMAGE = "https://via.placeholder.com/150";

    const newProfile = {
      ...formData,
      image: formData.image || DEFAULT_IMAGE,
      id: Date.now()
    };

    const existing = JSON.parse(localStorage.getItem("userProfiles") || "[]");
    localStorage.setItem("userProfiles", JSON.stringify([...existing, newProfile]));
    setSuccess(true);

    // Save current user ID if role is Nanny or Family
    if (formData.role === "Nanny" || formData.role === "Family") {
      localStorage.setItem("currentUser", newProfile.id);
    }

    setFormData({
      name: "",
      role: "Nanny",
      location: "",
      experience: "",
      rate: "",
      availability: "Full-time",
      bio: "",
      image: ""
    });
  };

  return (
    <div className="form-container">
      <h2>Create a Profile</h2>
      {success && <p className="success-msg">Profile created successfully!</p>}

      <button
        onClick={() => navigate(-1)}
        className="expand-btn"
        style={{ marginBottom: "1rem" }}
      >
        ⬅ Back
      </button>

      <form onSubmit={handleSubmit}>
        <label>
          Name*:
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Nanny">Nanny</option>
            <option value="Family">Family</option>
          </select>
        </label>

        <label>
          Location*:
          <input name="location" value={formData.location} onChange={handleChange} />
        </label>

        <label>
          Experience (years):
          <input
            name="experience"
            type="number"
            value={formData.experience}
            onChange={handleChange}
          />
        </label>

        <label>
          Rate*:
          <input name="rate" value={formData.rate} onChange={handleChange} />
        </label>

        <label>
          Availability:
          <select name="availability" value={formData.availability} onChange={handleChange}>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </label>

        <label>
          Bio*:
          <textarea name="bio" value={formData.bio} onChange={handleChange} />
        </label>

        <label>
          Image URL:
          <input name="image" value={formData.image} onChange={handleChange} />
        </label>

        <button type="button" onClick={handlePreview}>
          Preview Profile
        </button>

        <button type="submit">Save Profile</button>
      </form>

      {previewProfile && (
        <div className="preview-panel">
          <h3>Preview</h3>
          <div className="card">
            <img
              src={previewProfile.image}
              alt={previewProfile.name}
              className="profile-photo"
            />
            <h2>{previewProfile.name}</h2>
            <p><strong>Role:</strong> {previewProfile.role}</p>
            <p><strong>Location:</strong> {previewProfile.location}</p>
            <p><strong>Experience:</strong> {previewProfile.experience} years</p>
            <p><strong>Rate:</strong> {previewProfile.rate}</p>
            <p><strong>Availability:</strong> {previewProfile.availability}</p>
            <p><strong>Bio:</strong> {previewProfile.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateProfile;
