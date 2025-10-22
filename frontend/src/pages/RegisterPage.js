import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [error, setError] = useState('');

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/login');
    } catch(err) { setError(err.response?.data?.msg || 'Error'); }
  };

  return (
    <div style={{ padding:'50px', maxWidth:'400px', margin:'0 auto' }}>
      <h2>Register</h2>
      {error && <p style={{ color:'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input placeholder="Name" value={form.name} required
          onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="Email" value={form.email} required
          onChange={e=>setForm({...form,email:e.target.value})} />
        <input placeholder="Password" type="password" value={form.password} required
          onChange={e=>setForm({...form,password:e.target.value})} />
        <button type="submit">Register</button>
      </form>
      <p>Already have account? <Link to="/login">Login</Link></p>
    </div>
  );
}
