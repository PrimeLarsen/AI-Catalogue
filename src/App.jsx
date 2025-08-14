import React from 'react';
  // Modal overlay for supplier presentation
  const [modalSupplier, setModalSupplier] = useState(null);
  const openModal = (supplier) => {
    let tags = [];
    if (Array.isArray(supplier.tags)) {
      tags = supplier.tags;
    } else if (supplier.tag) {
      tags = [supplier.tag];
    }
    setModalSupplier({ ...supplier, tags });
  };
  const closeModal = () => setModalSupplier(null);

  // Modal rendering
  const Modal = ({ children }) => (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,32,91,0.18)',
      zIndex: 99999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflowY: 'auto',
    }}>
      <div style={{ position: 'relative', maxWidth: 700, width: '95vw', background: '#fff', borderRadius: 12, boxShadow: '0 4px 32px rgba(0,32,91,0.18)', padding: 0 }}>
        <button onClick={closeModal} style={{ position: 'absolute', top: 18, right: 18, background: '#eaf2ff', color: '#2351a2', border: 'none', borderRadius: 6, padding: '0.4rem 1.1rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', zIndex: 2 }}>Close</button>
        {children}
      </div>
    </div>
  );

import { useState, useEffect } from 'react';
import './App.css';
import { suppliers as initialSuppliers } from './suppliers';
import SupplierCard from './SupplierCard';
import SupplierDetailsPage from './SupplierDetailsPage';
import FilterSection from './FilterSection';



function App() {
  const [filter, setFilter] = useState('');
  const [suppliers, setSuppliers] = useState(() => {
    const saved = localStorage.getItem('suppliers');
    // If the saved suppliers are from the old (fictional) list, ignore them and use the new real list
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Heuristic: if the first supplier is OpenAI, it's the new list
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].name === 'OpenAI') {
          return parsed;
        }
      } catch {}
    }
    // Otherwise, use the new real suppliers
    return initialSuppliers;
  });
  const [form, setForm] = useState({ name: '', description: '', gartnerScore: '', website: '', tags: [] });
  const [showForm, setShowForm] = useState(false);
<<<<<<< HEAD
  const [selectedSupplier, setSelectedSupplier] = useState(null);
=======
  const [configSupplier, setConfigSupplier] = useState(null); // For modal config
  const [docUpload, setDocUpload] = useState({ file: null, type: 'NDA' });
>>>>>>> 95bebd4 (Add supplier document upload, icon status, and improved card alignment/UX)

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(filter.toLowerCase()) ||
    supplier.description.toLowerCase().includes(filter.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      // Split by comma, trim, remove empty
      setForm(f => ({ ...f, tags: value.split(',').map(t => t.trim()).filter(Boolean) }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleAddSupplier = (e) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.gartnerScore || !form.website) return;
    setSuppliers(sups => [
      ...sups,
      {
        id: sups.length ? Math.max(...sups.map(s => s.id)) + 1 : 1,
        name: form.name,
        description: form.description,
        gartnerScore: parseFloat(form.gartnerScore),
        website: form.website,
        tags: form.tags
      }
    ]);
    setForm({ name: '', description: '', gartnerScore: '', website: '', tags: [] });
    setShowForm(false);
  };

<<<<<<< HEAD
  const handleOpenSupplier = (supplier) => {
    // Ensure tags is always an array for editing
    let tags = [];
    if (Array.isArray(supplier.tags)) {
      tags = supplier.tags;
    } else if (supplier.tag) {
      tags = [supplier.tag];
    }
    setSelectedSupplier({ ...supplier, tags });
  };

  const handleBack = () => {
    setSelectedSupplier(null);
  };

  const handleSaveSupplier = (updatedSupplier) => {
    setSuppliers(sups => sups.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
    setSelectedSupplier(null);
  };

  // Persist suppliers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  if (selectedSupplier) {
    return <SupplierDetailsPage supplier={selectedSupplier} onBack={handleBack} onSave={handleSaveSupplier} />;
  }

=======
  // Modal config handlers
  const openConfigModal = (supplier) => {
    setConfigSupplier(supplier);
    setDocUpload({ file: null, type: 'NDA' });
  };
  const closeConfigModal = () => setConfigSupplier(null);
  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfigSupplier(s => ({ ...s, [name]: value }));
  };
  const handleConfigSave = (e) => {
    e.preventDefault();
    setSuppliers(sups => sups.map(s => s.id === configSupplier.id ? { ...configSupplier, gartnerScore: parseFloat(configSupplier.gartnerScore) } : s));
    closeConfigModal();
  };

  // Document upload handlers
  const handleDocTypeChange = (e) => {
    setDocUpload(d => ({ ...d, type: e.target.value }));
  };
  const handleDocFileChange = (e) => {
    setDocUpload(d => ({ ...d, file: e.target.files[0] }));
  };
  const handleDocUpload = (e) => {
    e.preventDefault();
    if (!docUpload.file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const newDoc = {
        name: docUpload.file.name,
        type: docUpload.type,
        url: ev.target.result,
        uploaded: new Date().toISOString(),
      };
      setConfigSupplier(s => ({
        ...s,
        documents: s.documents ? [...s.documents, newDoc] : [newDoc],
      }));
      setDocUpload({ file: null, type: 'NDA' });
    };
    reader.readAsDataURL(docUpload.file);
  };
  const handleDocDelete = (idx) => {
    setConfigSupplier(s => ({
      ...s,
      documents: s.documents.filter((_, i) => i !== idx),
    }));
  };

>>>>>>> 95bebd4 (Add supplier document upload, icon status, and improved card alignment/UX)
  return (
    <div>
      <header className="catalog-header">
        <div className="catalog-logo">
          <span role="img" aria-label="AI">🤖</span>
        </div>
        <span className="catalog-title">Digital Operations Catalogue</span>
      </header>
      <div className="catalog-subtitle">
        We pioneer and drive the digital transformation in Operations
      </div>
      <button style={{marginBottom: '1.5rem', background: '#0091cd', color: '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer'}} onClick={() => setShowForm(f => !f)}>
        {showForm ? 'Cancel' : 'Add New Supplier'}
      </button>
      {showForm && (
        <form onSubmit={handleAddSupplier} style={{background: '#fff', border: '1.5px solid #0091cd', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', boxShadow: '0 2px 8px rgba(0,32,91,0.08)'}}>
          <div style={{marginBottom: '1rem'}}>
            <input name="name" value={form.name} onChange={handleInputChange} placeholder="Supplier Name" style={{width: '100%', padding: '0.7rem', borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem'}} />
          </div>
          <div style={{marginBottom: '1rem'}}>
            <textarea name="description" value={form.description} onChange={handleInputChange} placeholder="Description" rows={2} style={{width: '100%', padding: '0.7rem', borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem'}} />
          </div>
          <div style={{marginBottom: '1rem'}}>
            <input name="gartnerScore" value={form.gartnerScore} onChange={handleInputChange} placeholder="Gartner Score" type="number" min="0" max="5" step="0.1" style={{width: '100%', padding: '0.7rem', borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem'}} />
          </div>
          <div style={{marginBottom: '1rem'}}>
            <input name="website" value={form.website} onChange={handleInputChange} placeholder="Website URL" style={{width: '100%', padding: '0.7rem', borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem'}} />
          </div>
          <div style={{marginBottom: '1rem'}}>
            <input name="tags" value={form.tags.join(', ')} onChange={handleInputChange} placeholder="Tags (comma separated, e.g. NDA, Partner, etc.)" style={{width: '100%', padding: '0.7rem', borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem'}} />
          </div>
          <button type="submit" style={{background: '#00205b', color: '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer'}}>Add Supplier</button>
        </form>
      )}
      <FilterSection filter={filter} setFilter={setFilter} />
      <div className="supplier-list">
        {filteredSuppliers.length === 0 ? (
          <p>No suppliers found.</p>
        ) : (
<<<<<<< HEAD
          <>
            {filteredSuppliers.map(supplier => (
              <div key={supplier.id} style={{ cursor: 'pointer' }}
                onClick={e => {
                  // Only open modal if not clicking a button or link
                  if (e.target.closest('button') || e.target.closest('a')) return;
                  openModal(supplier);
                }}
              >
                <SupplierCard {...supplier} onOpen={() => handleOpenSupplier(supplier)} />
              </div>
            ))}
            {modalSupplier && (
              <Modal>
                <div style={{ padding: 40 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
                    {modalSupplier.logo && (
                      <img src={modalSupplier.logo} alt={modalSupplier.name + ' logo'} style={{ width: 72, height: 72, objectFit: 'contain', borderRadius: 12, background: '#f4fafd', border: '1px solid #eee' }} />
                    )}
                    <div>
                      <h2 style={{ margin: 0, color: '#00205b', fontSize: '2rem', fontWeight: 700 }}>{modalSupplier.name}</h2>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                        {modalSupplier.tags && modalSupplier.tags.map((tag, idx) => (
                          <span key={idx}><SupplierTag tag={tag} /></span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '1.13rem', color: '#3a4a5a', marginBottom: 18 }}>{modalSupplier.description}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
                    <span style={{ fontWeight: 600, color: '#0091cd' }}>Gartner Score: {modalSupplier.gartnerScore}</span>
                    <a href={modalSupplier.website} target="_blank" rel="noopener noreferrer" className="supplier-link-icon" title="Visit Website" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%', background: '#00205b', color: '#fff', textDecoration: 'none', fontSize: 20, marginLeft: 4 }}>
                      <FiGlobe />
                    </a>
                  </div>
                </div>
              </Modal>
            )}
          </>
=======
          filteredSuppliers.map(supplier => {
            // Check for NDA and IS Safety docs
            const hasNDA = (supplier.documents || []).some(doc => doc.type === 'NDA');
            const hasISSafety = (supplier.documents || []).some(doc => doc.type === 'IS Safety');
            return (
              <SupplierCard
                key={supplier.id}
                {...supplier}
                ndaStatus={hasNDA ? 'approved' : 'missing'}
                isSafetyStatus={hasISSafety ? 'approved' : 'missing'}
                onConfig={() => openConfigModal(supplier)}
              />
            );
          })
>>>>>>> 95bebd4 (Add supplier document upload, icon status, and improved card alignment/UX)
        )}
      </div>
      {/* Config Modal */}
      {configSupplier && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,32,91,0.18)', zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'auto',
          padding: '4vw',
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            maxHeight: '92vh',
            overflowY: 'auto',
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 4px 32px rgba(0,32,91,0.18)',
            padding: '3vw 3vw 2vw 3vw',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}>
            <button onClick={closeConfigModal} style={{ position: 'absolute', top: 32, right: 32, background: '#eaf2ff', color: '#2351a2', border: 'none', borderRadius: 6, padding: '0.4rem 1.1rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', zIndex: 2 }}>Close</button>
            <h2 style={{marginBottom: 32, textAlign: 'left', color: '#00205b', fontSize: '2rem'}}>Edit Supplier</h2>
            <form onSubmit={handleConfigSave}>
              <div style={{marginBottom: '2rem'}}>
                <input name="name" value={configSupplier.name} onChange={handleConfigChange} placeholder="Supplier Name" style={{width: '100%', padding: '1.2rem', borderRadius: 10, border: '1.5px solid #0091cd', fontSize: '1.2rem', background: '#f7fafc', color: '#111'}} />
              </div>
              <div style={{marginBottom: '2rem'}}>
                <textarea name="description" value={configSupplier.description} onChange={handleConfigChange} placeholder="Description" rows={4} style={{width: '100%', padding: '1.2rem', borderRadius: 10, border: '1.5px solid #0091cd', fontSize: '1.2rem', background: '#f7fafc', color: '#111'}} />
              </div>
              <div style={{marginBottom: '2rem'}}>
                <input name="gartnerScore" value={configSupplier.gartnerScore} readOnly disabled placeholder="Gartner Score" type="number" min="0" max="5" step="0.1" style={{width: '100%', padding: '1.2rem', borderRadius: 10, border: '1.5px solid #0091cd', fontSize: '1.2rem', background: '#f7fafc', color: '#111', opacity: 0.7, cursor: 'not-allowed'}} />
              </div>
              <div style={{marginBottom: '2rem'}}>
                <input name="website" value={configSupplier.website} readOnly disabled placeholder="Website URL" style={{width: '100%', padding: '1.2rem', borderRadius: 10, border: '1.5px solid #0091cd', fontSize: '1.2rem', background: '#f7fafc', color: '#111', opacity: 0.7, cursor: 'not-allowed'}} />
              </div>
              {/* Document Upload Section */}
              <div style={{marginBottom: '2.5rem', background: '#f7fafc', borderRadius: 10, padding: '1.5rem'}}>
                <h3 style={{marginTop: 0, color: '#2351a2'}}>Documents</h3>
                <form onSubmit={handleDocUpload} style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.2rem'}}>
                  <input type="file" onChange={handleDocFileChange} style={{flex: 2}} />
                  <select value={docUpload.type} onChange={handleDocTypeChange} style={{flex: 1, padding: '0.5rem', borderRadius: 6, border: '1.5px solid #0091cd', fontSize: '1rem'}}>
                    <option value="NDA">NDA</option>
                    <option value="IS Safety">IS Safety</option>
                    <option value="Other">Other</option>
                  </select>
                  <button type="submit" style={{background: '#0091cd', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer'}}>Upload</button>
                </form>
                <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                  {(configSupplier.documents || []).length === 0 && <li style={{color: '#888'}}>No documents uploaded.</li>}
                  {(configSupplier.documents || []).map((doc, idx) => (
                    <li key={idx} style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 8, background: '#fff', borderRadius: 6, padding: '0.5rem 1rem', border: '1px solid #e0e8f0'}}>
                      <span style={{fontWeight: 500, color: '#00205b'}}>{doc.name}</span>
                      <span style={{fontSize: '0.95em', color: '#2351a2', background: '#eaf2ff', borderRadius: 4, padding: '0.2rem 0.7rem'}}>{doc.type}</span>
                      <a href={doc.url} download={doc.name} style={{color: '#0091cd', textDecoration: 'underline', fontSize: '0.95em'}}>Download</a>
                      <button type="button" onClick={() => handleDocDelete(idx)} style={{background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4, padding: '0.2rem 0.7rem', cursor: 'pointer', fontSize: '0.95em'}}>Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
              <button type="submit" style={{background: '#00205b', color: '#fff', border: 'none', borderRadius: 12, padding: '1rem 2.2rem', fontWeight: 600, fontSize: '1.2rem', cursor: 'pointer'}}>Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
