
import React, { useState } from "react";
import SupplierTag from "./SupplierTag";

const TAG_OPTIONS = [
  "Advanced Analytics",
  "Applied AI",
  "AI Vision",
  "Augmented Reality"
];

const SupplierDetailsPage = ({ supplier, onBack, onSave }) => {
  const [tags, setTags] = useState(Array.isArray(supplier.tags) ? supplier.tags : (supplier.tag ? [supplier.tag] : []));
  const [info, setInfo] = useState(supplier.info || "");
  // Placeholder for document upload/links
  const [documents, setDocuments] = useState(supplier.documents || []);

  const handleSave = () => {
    onSave({ ...supplier, tags, info, documents });
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', position: 'fixed', left: 0, top: 0, background: '#f3f6fb', zIndex: 9999, overflowY: 'auto', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <div style={{
        width: '100%',
        maxWidth: 900,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px 0 rgba(0,32,91,0.10)',
        padding: '0 0 48px 0',
        border: '1px solid #e1e4ea',
        minHeight: 600,
        marginTop: 48
      }}>
        <div style={{
          background: 'linear-gradient(90deg, #eaf2ff 0%, #f7fafd 100%)',
          borderRadius: '8px 8px 0 0',
          padding: '32px 48px 24px 48px',
          borderBottom: '1px solid #e1e4ea',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{ color: '#00205b', fontSize: '2.1rem', fontWeight: 700, margin: 0, letterSpacing: 0.01 }}>{supplier?.name || ''}</h2>
            {tags.map((tag, idx) => <SupplierTag key={idx} tag={tag} />)}
          </div>
          <button onClick={onBack} style={{ background: '#eaf2ff', color: '#2351a2', border: 'none', borderRadius: 6, padding: '0.5rem 1.3rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 1px 4px #eaf2ff' }}>Back</button>
        </div>
        <div style={{ padding: '40px 48px 0 48px' }}>
          <div style={{ marginBottom: 32 }}>
            <label style={{ fontWeight: 600, color: '#00205b', fontSize: '1.08rem', display: 'block', marginBottom: 8 }}>Tags</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: 12 }}>
              {TAG_OPTIONS.map(option => {
                const selected = tags.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      if (selected) {
                        setTags(tags.filter(t => t !== option));
                      } else {
                        setTags([...tags, option]);
                      }
                    }}
                    style={{
                      padding: '0.5rem 1.1rem',
                      borderRadius: 20,
                      border: selected ? '2px solid #2351a2' : '1.5px solid #eaf2ff',
                      background: selected ? '#eaf2ff' : '#f7fafd',
                      color: selected ? '#2351a2' : '#00205b',
                      fontWeight: 600,
                      fontSize: '1rem',
                      cursor: 'pointer',
                      outline: selected ? '2px solid #2351a2' : 'none',
                      boxShadow: selected ? '0 2px 8px #eaf2ff' : 'none',
                      transition: 'all 0.15s'
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div style={{ fontSize: 13, color: '#888' }}>Click to select/deselect tags. Selected tags are highlighted.</div>
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={{ fontWeight: 600, color: '#00205b', fontSize: '1.08rem', display: 'block', marginBottom: 8 }}>Information</label>
            <textarea value={info} onChange={e => setInfo(e.target.value)} rows={5} style={{ width: '100%', marginBottom: 0, padding: '0.7rem', borderRadius: 6, border: '1.5px solid #eaf2ff', fontSize: '1.08rem', background: '#f7fafd', color: '#00205b', fontWeight: 500, resize: 'vertical' }} />
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={{ fontWeight: 600, color: '#00205b', fontSize: '1.08rem', display: 'block', marginBottom: 8 }}>Documents</label>
            <input type="file" multiple disabled style={{ marginBottom: 8, background: '#f7fafd', borderRadius: 6, border: '1.5px solid #eaf2ff', color: '#888', fontWeight: 500 }} />
            <div style={{ fontSize: 13, color: '#888' }}>(Document upload coming soon)</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <button onClick={handleSave} style={{ background: '#0091cd', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 2.2rem', fontWeight: 700, fontSize: '1.15rem', cursor: 'pointer' }}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailsPage;
