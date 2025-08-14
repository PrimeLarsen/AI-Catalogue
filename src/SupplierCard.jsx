import { FaFileAlt } from "react-icons/fa";
import React from "react";
import "./SupplierCard.css";

const SupplierCard = ({ name, description, gartnerScore, website, logo, ndaStatus }) => (
  <div className="supplier-card">
    <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem'}}>
      {logo && (
        <img src={logo} alt={name + ' logo'} style={{width: 48, height: 48, objectFit: 'contain', borderRadius: 8, background: '#f4fafd', border: '1px solid #eee'}} onError={e => { e.target.style.display = 'none'; }} />
      )}
      <h2 style={{margin: 0}}>{name}</h2>
    </div>
    <p>{description}</p>
    <div className="supplier-details">
      <span className="gartner-score">Gartner Score: {gartnerScore}</span>
      <a href={website} target="_blank" rel="noopener noreferrer" className="supplier-link">
        Visit Website
      </a>
    </div>
    <div className="supplier-icons-row" style={{display: 'flex', gap: '1.2rem', marginTop: '1.1rem', alignItems: 'center'}}>
      <span title={ndaStatus === 'approved' ? 'NDA linked and approved' : 'NDA missing'} style={{display: 'flex', alignItems: 'center'}}>
        <FaFileAlt size={22} color={ndaStatus === 'approved' ? '#2ecc40' : '#e74c3c'} style={{verticalAlign: 'middle'}} />
      </span>
      {/* Room for 2 more icons */}
      <span style={{width: 22, height: 22, display: 'inline-block'}}></span>
      <span style={{width: 22, height: 22, display: 'inline-block'}}></span>
    </div>
  </div>
);

export default SupplierCard;
