import React from "react";
import SupplierTag from "./SupplierTag";
import { FiSettings, FiGlobe } from "react-icons/fi";
import "./SupplierCard.css";

const SupplierCard = (props) => {
  // Support legacy suppliers with single tag
  const { name, description, gartnerScore, website, logo, tag, tags, onOpen } = props;
  const tagList = Array.isArray(tags) ? tags : (tag ? [tag] : []);
  return (
    <div className="supplier-card" style={{position: 'relative'}}>
      <button
        onClick={onOpen}
        title="Edit supplier"
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          zIndex: 2
        }}
      >
        <FiSettings size={20} color="#2351a2" />
      </button>
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem'}}>
        {logo && (
          <img src={logo} alt={name + ' logo'} style={{width: 48, height: 48, objectFit: 'contain', borderRadius: 8, background: '#f4fafd', border: '1px solid #eee'}} onError={e => { e.target.style.display = 'none'; }} />
        )}
        <h2 style={{margin: 0}}>{name}</h2>
      </div>
      <p>{description}</p>
      <div className="supplier-details">
        <span className="gartner-score">Gartner Score: {gartnerScore}</span>
        <a href={website} target="_blank" rel="noopener noreferrer" className="supplier-link-icon" title="Visit Website" style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: '#00205b', color: '#fff', textDecoration: 'none', fontSize: 20, marginLeft: 4}}>
          <FiGlobe />
        </a>
      </div>
      <div className="supplier-icons-row" style={{display: 'flex', gap: '0.5rem', marginTop: '1.1rem', alignItems: 'center', flexWrap: 'wrap'}}>
        {tagList.map((t, idx) => (
          <SupplierTag key={idx} tag={t} />
        ))}
        {/* Room for 2 more icons */}
        <span style={{width: 22, height: 22, display: 'inline-block'}}></span>
        <span style={{width: 22, height: 22, display: 'inline-block'}}></span>
      </div>
    </div>
  );
}

export default SupplierCard;
