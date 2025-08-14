import React from "react";
import "./FilterSection.css";

const FilterSection = ({ filter, setFilter }) => (
  <div className="filter-section">
    <input
      type="text"
      placeholder="Search suppliers..."
      value={filter}
      onChange={e => setFilter(e.target.value)}
      className="filter-input"
    />
  </div>
);

export default FilterSection;
