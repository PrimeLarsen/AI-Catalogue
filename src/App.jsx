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
  const [selectedSupplier, setSelectedSupplier] = useState(null);

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
        )}
      </div>
    </div>
  );
}

export default App;
