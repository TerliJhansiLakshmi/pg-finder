import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:'', password:'' });
  const [error, setError] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/filters'); // go to filter page
    } catch(err) { setError(err.response?.data?.msg || 'Error'); }
  };

  return (
    <div style={{ padding:'50px', maxWidth:'400px', margin:'0 auto' }}>
      <h2>Login</h2>
      {error && <p style={{ color:'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input placeholder="Email" value={form.email} required
          onChange={e=>setForm({...form,email:e.target.value})} />
        <input placeholder="Password" type="password" value={form.password} required
          onChange={e=>setForm({...form,password:e.target.value})} />
        <button type="submit">Login</button>
      </form>
      <p>Don't have account? <Link to="/register">Register</Link></p>
    </div>
  );
}
