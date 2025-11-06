import React from "react";
import SupplierTag from "./SupplierTag";
import { FaFileAlt, FaCog, FaGlobe, FaShieldAlt, FaFileSignature } from "react-icons/fa";
import "./SupplierCard.css";

const SupplierCard = ({ name, description, gartnerScore, website, logo, ndaStatus, isSafetyStatus, onConfig }) => (
  <div className="supplier-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
    <button
      className="supplier-config-gear"
      style={{
        position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', cursor: 'pointer', zIndex: 2, padding: 0
      }}
      title="Configure Supplier"
      onClick={onConfig}
    >
      <FaCog size={20} color="#2351a2" />
    </button>
    <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem'}}>
      {logo && (
        <img src={logo} alt={name + ' logo'} style={{width: 48, height: 48, objectFit: 'contain', borderRadius: 8, background: '#f4fafd', border: '1px solid #eee'}} onError={e => { e.target.style.display = 'none'; }} />
      )}
      <h2 style={{margin: 0}}>{name}</h2>
    </div>
    <p>{description}</p>
    <div style={{flexGrow: 1}}></div>
    <div className="supplier-details">
      <span className="gartner-score">Gartner Score: {gartnerScore}</span>
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="supplier-link"
        title="Visit Website"
        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#eaf2ff', border: 'none', borderRadius: 6, padding: '0.4rem 0.7rem', cursor: 'pointer', marginLeft: 8 }}
      >
        <FaGlobe size={18} color="#2351a2" />
      </a>
    </div>
    <div className="supplier-icons-row" style={{display: 'flex', gap: '1.2rem', marginTop: '1.1rem', alignItems: 'center'}}>
      {/* NDA Icon */}
      <span title={ndaStatus === 'approved' ? 'NDA uploaded' : 'NDA missing'} style={{display: 'flex', alignItems: 'center'}}>
        <FaFileSignature size={22} color={ndaStatus === 'approved' ? '#2ecc40' : '#e74c3c'} style={{verticalAlign: 'middle'}} />
      </span>
      {/* IS Safety Icon */}
      <span title={isSafetyStatus === 'approved' ? 'IS Safety doc uploaded' : 'IS Safety doc missing'} style={{display: 'flex', alignItems: 'center'}}>
        <FaShieldAlt size={22} color={isSafetyStatus === 'approved' ? '#2ecc40' : '#e74c3c'} style={{verticalAlign: 'middle'}} />
      </span>
      {/* Room for 1 more icon */}
      <span style={{width: 22, height: 22, display: 'inline-block'}}></span>
    </div>
  </div>
);

export default SupplierCard;
