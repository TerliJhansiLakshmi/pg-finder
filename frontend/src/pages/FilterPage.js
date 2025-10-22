import React, { useEffect, useState } from 'react';
import { fetchStates, fetchCities } from '../api';
import { useNavigate } from 'react-router-dom';

export default function FilterPage() {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filter, setFilter] = useState({ state:'', city:'', minRent:'', maxRent:'', gender:'', wifi:false, ac:false, washingMachine:false });

  useEffect(() => { fetchStates().then(setStates); }, []);
  useEffect(() => { 
    if(filter.state) fetchCities(filter.state).then(setCities); 
    else setCities([]); 
  }, [filter.state]);

  const handleChange = (k,v) => setFilter({...filter,[k]:v});
  const handleSubmit = e => { e.preventDefault(); localStorage.setItem('filter', JSON.stringify(filter)); navigate('/pgs'); }

  return (
    <div style={{ padding:'20px', maxWidth:'600px', margin:'0 auto' }}>
      <h2>Select Filters</h2>
      <form onSubmit={handleSubmit}>
        <label>State:</label>
        <select value={filter.state} onChange={e=>handleChange('state', e.target.value)}>
          <option value="">Select</option>
          {states.map(s=><option key={s._id} value={s._id}>{s.name}</option>)}
        </select>

        <label>City:</label>
        <select value={filter.city} onChange={e=>handleChange('city', e.target.value)}>
          <option value="">Select</option>
          {cities.map(c=><option key={c._id} value={c._id}>{c.name}</option>)}
        </select>

        <label>Min Rent:</label>
        <input type="number" value={filter.minRent} onChange={e=>handleChange('minRent',e.target.value)} />

        <label>Max Rent:</label>
        <input type="number" value={filter.maxRent} onChange={e=>handleChange('maxRent',e.target.value)} />

        <label>Gender:</label>
        <select value={filter.gender} onChange={e=>handleChange('gender',e.target.value)}>
          <option value="">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unisex">Unisex</option>
        </select>

        <label><input type="checkbox" checked={filter.wifi} onChange={e=>handleChange('wifi', e.target.checked)} /> Wi-Fi</label>
        <label><input type="checkbox" checked={filter.ac} onChange={e=>handleChange('ac', e.target.checked)} /> AC</label>
        <label><input type="checkbox" checked={filter.washingMachine} onChange={e=>handleChange('washingMachine', e.target.checked)} /> Washing Machine</label>

        <button type="submit" style={{ marginTop:'10px' }}>Show PGs</button>
      </form>
    </div>
  );
}
