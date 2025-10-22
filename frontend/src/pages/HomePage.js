import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div style={{ textAlign:'center', padding:'50px' }}>
      <h1 style={{ fontSize:'32px', marginBottom:'15px' }}>Find PGs Near You</h1>
      <p style={{ color:'#555', marginBottom:'20px' }}>Browse by state, city, rent & features</p>
      <Link to="/pgs" style={{ padding:'10px 20px', background:'#3b82f6', color:'white', textDecoration:'none', borderRadius:'5px' }}>Browse PGs</Link>
    </div>
  );
}
