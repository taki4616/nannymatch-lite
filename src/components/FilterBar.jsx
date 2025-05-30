import React from "react";

function FilterBar({
  selectedRole,
  selectedLocation,
  selectedAvailability,
  onRoleChange,
  onLocationChange,
  onAvailabilityChange,
}) {
  return (
    <div className="filter-bar">
      <label>
        Role
        <select value={selectedRole} onChange={(e) => onRoleChange(e.target.value)}>
          <option value="">All</option>
          <option value="Nanny">Nanny</option>
          <option value="Family">Family</option>
        </select>
      </label>

      <label>
        Location
        <select value={selectedLocation} onChange={(e) => onLocationChange(e.target.value)}>
          <option value="">All</option>
          <option value="Brooklyn, NY">Brooklyn, NY</option>
          <option value="Harlem, NY">Harlem, NY</option>
          <option value="Queens, NY">Queens, NY</option>
        </select>
      </label>

      <label>
        Availability
        <select value={selectedAvailability} onChange={(e) => onAvailabilityChange(e.target.value)}>
          <option value="">All</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
      </label>

<span className="clear-link" onClick={() => {
  onRoleChange("");
  onLocationChange("");
  onAvailabilityChange("");
}}>
  Clear Filters
</span>

    </div>
  );
}

export default FilterBar;
