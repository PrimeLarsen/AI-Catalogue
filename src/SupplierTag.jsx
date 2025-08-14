import React from "react";
import "./SupplierCard.css";


// Assign a unique color class for each tag
const TAG_COLOR_MAP = {
  'Advanced Analytics': 'supplier-tag-purple',
  'Applied AI': 'supplier-tag-blue',
  'AI Vision': 'supplier-tag-green',
  'Augmented Reality': 'supplier-tag-orange',
  'NDA': 'supplier-tag-yellow',
  'Partner': 'supplier-tag-pink',
  // Add more tag-color mappings as needed
};

const getTagClass = (tag) => {
  if (!tag) return '';
  return TAG_COLOR_MAP[tag] || 'supplier-tag-blue';
};

const SupplierTag = ({ tag }) => {
  if (!tag) return null;
  return (
    <span className={`supplier-tag ${getTagClass(tag)}`}>{tag}</span>
  );
};

export default SupplierTag;
