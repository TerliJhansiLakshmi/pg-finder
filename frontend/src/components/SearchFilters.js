import React, { useEffect, useState } from 'react';
import { fetchStates, fetchCities } from '../api';

export default function SearchFilters({ onChange }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [form, setForm] = useState({ state:'', city:'', q:'', gender:'', minRent:'', maxRent:'', wifi:false, ac:false, washingMachine:false });

  useEffect(() => { fetchStates().then(setStates).catch(()=>{}); }, []);
  useEffect(() => { if(form.state) fetchCities(form.state).then(setCities).catch(()=>setCities([])); else setCities([]); }, [form.state]);
  useEffect(() => { onChange(form); }, [form, onChange]);

  const set = (k,v) => setForm(prev => ({ ...prev, [k]:v }));

  return (
    <div style={{ border:'1px solid #ddd', padding:'10px', borderRadius:'6px', marginBottom:'15px' }}>
      <div><label>State:</label><select value={form.state} onChange={e=>set('state',e.target.value)}><option value="">All</option>{states.map(s=><option key={s._id} value={s._id}>{s.name}</option>)}</select></div>
      <div><label>City:</label><select value={form.city} onChange={e=>set('city',e.target.value)}><option value="">All</option>{cities.map(c=><option key={c._id} value={c._id}>{c.name}</option>)}</select></div>
      <div><label>Search:</label><input type="text" value={form.q} onChange={e=>set('q', e.target.value)} placeholder="Name or Address"/></div>
      <div><label>Gender:</label><select value={form.gender} onChange={e=>set('gender', e.target.value)}><option value="">Any</option><option value="male">Male</option><option value="female">Female</option><option value="unisex">Unisex</option></select></div>
      <div><label>Min Rent:</label><input type="number" value={form.minRent} onChange={e=>set('minRent', e.target.value)}/></div>
      <div><label>Max Rent:</label><input type="number" value={form.maxRent} onChange={e=>set('maxRent', e.target.value)}/></div>
      <div>
        <label><input type="checkbox" checked={form.wifi} onChange={e=>set('wifi',e.target.checked)}/> Wi-Fi</label>
        <label><input type="checkbox" checked={form.ac} onChange={e=>set('ac',e.target.checked)}/> AC</label>
        <label><input type="checkbox" checked={form.washingMachine} onChange={e=>set('washingMachine',e.target.checked)}/> Washing</label>
      </div>
    </div>
  );
}
