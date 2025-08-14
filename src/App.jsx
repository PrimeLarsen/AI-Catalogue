
import { useState } from 'react';
import './App.css';
import { suppliers as initialSuppliers } from './suppliers';
import SupplierCard from './SupplierCard';
import FilterSection from './FilterSection';


function App() {
  const [filter, setFilter] = useState('');
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [form, setForm] = useState({ name: '', description: '', gartnerScore: '', website: '' });
  const [showForm, setShowForm] = useState(false);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(filter.toLowerCase()) ||
    supplier.description.toLowerCase().includes(filter.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
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
        website: form.website
      }
    ]);
    setForm({ name: '', description: '', gartnerScore: '', website: '' });
    setShowForm(false);
  };

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
          <button type="submit" style={{background: '#00205b', color: '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer'}}>Add Supplier</button>
        </form>
      )}
      <FilterSection filter={filter} setFilter={setFilter} />
      <div className="supplier-list">
        {filteredSuppliers.length === 0 ? (
          <p>No suppliers found.</p>
        ) : (
          filteredSuppliers.map(supplier => (
            <SupplierCard key={supplier.id} {...supplier} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
